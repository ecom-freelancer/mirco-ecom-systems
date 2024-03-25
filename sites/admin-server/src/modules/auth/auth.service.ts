import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { LoginResponse } from './dtos/login.dto';
import { JwtPayload } from './interfaces/jwt.interface';
import { ConfigService } from '@nestjs/config';
import { GetProfileResponse } from './dtos/profile.dto';
import { RegisterDto } from './dtos/register.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { RefreshTokenResponse } from './dtos/refresh-token.dto';
import { RedisService, getResetPasswordRedisKey } from '@packages/nest-redis';
import { MailerService } from '@packages/nest-mail';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import dayjs from 'dayjs';
import {
  hashPassword,
  comparePassword,
  generateSessionId,
  generateOtp,
  mapActionsToSubject,
  VerifyOtpActions,
  CurrentVerifyInfo,
  SendEmailPayload,
} from '@packages/nest-helper';
import { SessionService } from '../session/session.service';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { LoginWithGoogleDto } from './dtos/login-with-google.dto';
import { GoogleService } from '@packages/nest-google';
import { LoginWithFacebookDto } from './dtos/login-with-facebook.dto';
import { FacebookResponseInterface } from './interfaces/facebook-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly mailerService: MailerService,
    private readonly sessionService: SessionService,
    private readonly googleService: GoogleService,
  ) {}

  async getProfileById(id: string): Promise<GetProfileResponse> {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...response } = user;
    return response;
  }

  async loginWithPassword(
    email: string,
    password: string,
  ): Promise<LoginResponse> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await comparePassword(password, user.password))) {
      throw new BadRequestException('Email or password is incorrect.');
    }

    const sessionId = generateSessionId();
    await this.sessionService.storeSession(user.id, sessionId);

    return this.generateTokens(user.id, sessionId);
  }

  async loginWithGoogle(payload: LoginWithGoogleDto) {
    const { accessToken } = payload;
    const googleUser = await this.googleService.authenticate(accessToken);

    let user = await this.userService.getUserByEmail(googleUser.email);

    // if user is not presented (new user) -> create new
    if (!user) {
      // Generate a random password, so I use this function too :D don't mind it
      const hashedPassword = await hashPassword(
        generateSessionId(),
        parseInt(this.configService.get('BCRYPT_SALT_OR_ROUNDS')),
      );

      user = await this.userService.createAccount({
        email: googleUser.email,
        name: googleUser.name,
        password: hashedPassword,
      });
    }

    const sessionId = generateSessionId();
    await this.sessionService.storeSession(user.id, sessionId);

    return this.generateTokens(user.id, sessionId);
  }

  async loginWithFacebook(payload: LoginWithFacebookDto) {
    const fields = 'id,name,email,picture,first_name,last_name';
    // Make a request to Facebook API to retrieve user information
    const response = await fetch(
      `https://graph.facebook.com/me?fields=${fields}&access_token=${payload.accessToken}`,
    );

    const facebookUser: FacebookResponseInterface = await response.json();
    const { error, email, name } = facebookUser;

    if (!!error) {
      throw new BadRequestException(error?.message);
    }
    if (!email) {
      throw new BadRequestException('This account does not have email');
    }

    let user = await this.userService.getUserByEmail(email);

    if (!user) {
      // Generate a random password, so I use this function too :D don't mind it
      const hashedPassword = await hashPassword(
        generateSessionId(),
        parseInt(this.configService.get('BCRYPT_SALT_OR_ROUNDS')),
      );

      user = await this.userService.createAccount({
        email,
        name,
        password: hashedPassword,
      });
    }

    const sessionId = generateSessionId();
    await this.sessionService.storeSession(user.id, sessionId);

    return this.generateTokens(user.id, sessionId);
  }

  async registerWithAccount(registerDto: RegisterDto) {
    const { password, username, email } = registerDto;

    const isExisted = await this.userService.checkDuplicatedUser({
      username,
      email,
    });

    if (!!isExisted) {
      throw new BadRequestException('Username or email is duplicated');
    }

    const hashedPassword = await hashPassword(
      password,
      parseInt(this.configService.get('BCRYPT_SALT_OR_ROUNDS')),
    );

    await this.userService.createAccount({
      ...registerDto,
      password: hashedPassword,
    });
  }

  async changePassword(id: string, payload: ChangePasswordDto) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { oldPassword, newPassword } = payload;

    if (!(await comparePassword(oldPassword, user.password))) {
      throw new UnauthorizedException('Current password is incorrect.');
    }

    const hashedPassword = await hashPassword(
      newPassword,
      parseInt(this.configService.get('BCRYPT_SALT_OR_ROUNDS')),
    );

    await this.userService.updateAccount({ ...user, password: hashedPassword });

    // Clear all session if password is changed
    await this.sessionService.clearAllSession(user.id);
  }

  async refreshToken(
    id: string,
    currentSessionId: string,
  ): Promise<RefreshTokenResponse> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.sessionService.deleteSession(user.id, currentSessionId);

    const newSessionId = generateSessionId();
    await this.sessionService.storeSession(user.id, newSessionId);
    return this.generateTokens(user.id, newSessionId);
  }

  async forgotPassword(payload: ForgotPasswordDto) {
    // STEP 1: gather user's info
    const { email } = payload;
    if (!email) {
      throw new BadRequestException('Username or email is missing');
    }

    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('This email does not belong to any account.');
    }

    // Step 2: store OTP into Redis
    const otp = generateOtp();
    const key = getResetPasswordRedisKey(email);
    const isExisted = await this.redisService._exists(key);

    const now = dayjs();

    if (!isExisted) {
      // If users have not sent any request before -> Just store it
      await this.redisService._hset(key, {
        otp,
        requestAttemptTimestamp: JSON.stringify([now.valueOf()]),
        verifyAttemptCount: 0,
      });
    } else {
      const restrictedDuration = parseInt(
        this.configService.get('OTP_RESTRICT_REQUEST_DURATION'),
      );

      const currentVerifyInfo = (await this.redisService._hgetall(
        key,
      )) as unknown as CurrentVerifyInfo;

      // If users are being restricted -> Throw error
      if (
        !!currentVerifyInfo.restrictedEndedAt &&
        now.isBefore(dayjs(parseInt(currentVerifyInfo.restrictedEndedAt)))
      ) {
        throw new BadRequestException(
          `You have sent too many requests, please wait for ${restrictedDuration} minutes to send a new OTP request`,
        );
      }

      // If users send too many request in a duration -> Restricted
      // Calculate from now subtract 10 minutes ago
      const requestAttemptTimestampList = JSON.parse(
        currentVerifyInfo.requestAttemptTimestamp,
      );

      const maxRequestDuration = now.subtract(
        this.configService.get('OTP_MAX_REQUEST_ATTEMPT_DURATION'),
        'minutes',
      );

      let countRecentRequest = 1;
      requestAttemptTimestampList.forEach((attempt) => {
        if (dayjs(attempt).isAfter(maxRequestDuration)) {
          countRecentRequest++;
        }
      });

      if (
        countRecentRequest >
        parseInt(this.configService.get('OTP_MAX_REQUEST_ATTEMPT_COUNT'))
      ) {
        await this.redisService._hset(key, {
          otp: '',
          requestAttemptTimestamp: JSON.stringify([]),
          verifyAttemptCount: 0,
          restrictedEndedAt: now.add(restrictedDuration, 'minutes').valueOf(),
        });
        throw new BadRequestException(
          `You have sent too many requests, please wait for ${restrictedDuration} to send a new OTP request`,
        );
      }

      // If okay => store to Redis with new timestamp added to list
      await this.redisService._hset(key, {
        otp,
        requestAttemptTimestamp: JSON.stringify([
          ...JSON.parse(currentVerifyInfo.requestAttemptTimestamp),
          now.valueOf(),
        ]),
        verifyAttemptCount: 0,
      });
    }

    // Step 3: send email to users
    const content = `Your OTP code to reset password is <b>${otp}</b>`;
    await this.sendEmail({
      destination: email,
      content,
      action: VerifyOtpActions.RESET_PASSWORD,
    });
  }

  // verify OTP and reset password
  async resetPassword(payload: ResetPasswordDto) {
    const { otp, newPassword, email } = payload;

    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const key = getResetPasswordRedisKey(email);

    const isExisted = await this.redisService._exists(key);
    if (!isExisted) {
      throw new BadRequestException('Please send an OTP request first');
    }

    const currentVerifyInfo = (await this.redisService._hgetall(
      key,
    )) as unknown as CurrentVerifyInfo;
    const now = dayjs();

    const requestAttemptTimestampList = JSON.parse(
      currentVerifyInfo.requestAttemptTimestamp,
    );

    const lastRequestTimestamp = dayjs(
      requestAttemptTimestampList[requestAttemptTimestampList.length - 1],
    );

    const validTime = lastRequestTimestamp.add(
      parseInt(this.configService.get('OTP_VALID_DURATION')),
      'minutes',
    );

    // Check all verification failed cases
    if (now.isAfter(validTime)) {
      throw new BadRequestException(
        'OTP is expired. Please send a new Reset password OTP request.',
      );
    }

    if (
      parseInt(currentVerifyInfo.verifyAttemptCount) ===
      parseInt(this.configService.get('OTP_MAX_VERIFY_ATTEMPT_COUNT'))
    ) {
      throw new BadRequestException(
        'You have exceeded the number of OTP verification. Please send a new Reset password OTP request.',
      );
    }

    if (currentVerifyInfo.otp !== otp) {
      await this.redisService._hset(key, [
        'verifyAttemptCount',
        parseInt(currentVerifyInfo.verifyAttemptCount) + 1,
      ]);
      throw new BadRequestException('OTP is incorrect.');
    }

    const hashedPassword = await hashPassword(
      newPassword,
      parseInt(this.configService.get('BCRYPT_SALT_OR_ROUNDS')),
    );
    await this.userService.updateAccount({ ...user, password: hashedPassword });
    await this.redisService._del(key);

    // Clear all session if users login at other devices
    await this.sessionService.clearAllSession(user.id);
  }

  // Clear all session
  async logout(userId: string) {
    await this.sessionService.clearAllSession(userId);
  }

  async checkPassword(id: string, password: string) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await comparePassword(password, user.password))) {
      throw new BadRequestException('Password is incorrect.');
    }

    return 'Correct password';
  }

  async updateAccount(id: string, payload: UpdateAccountDto) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userService.updateAccount({ ...user, ...payload });
  }

  //---------------------------- Helpers function ----------------------------

  async generateTokens(id: string, sessionId: string) {
    const payload: JwtPayload = { sub: id, sessionId };

    const accessToken = await this.generateJWT(
      payload,
      this.configService.get('ACCESS_TOKEN_VALID_DURATION') + 'd',
    );
    const refreshToken = await this.generateJWT(
      payload,
      this.configService.get('REFRESH_TOKEN_VALID_DURATION') + 'd',
    );

    return plainToInstance(LoginResponse, {
      accessToken,
      refreshToken,
    });
  }

  async verifyAsync(token: string) {
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('Token is invalid');
    }
  }

  async generateJWT(payload: any, expiresIn = '1d') {
    return await this.jwtService.signAsync(payload, {
      expiresIn,
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async sendEmail(payload: SendEmailPayload): Promise<void> {
    const { destination, action, content } = payload;

    await this.mailerService.sendMail({
      to: destination, // list of receivers
      subject: mapActionsToSubject(action), // Subject line
      html: content, // HTML body content
    });
  }
}
