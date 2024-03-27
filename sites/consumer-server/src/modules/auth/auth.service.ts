import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  comparePassword,
  CurrentVerifyInfo,
  generateOtp,
  generateSessionId,
  hashPassword,
  mapActionsToSubject,
  SendEmailPayload,
  VerifyOtpActions,
} from '@packages/nest-helper';
import { CustomerService } from '../customer/customer.service';
import { RegisterDto } from './dtos/register.dto';
import { ConfigService } from '@nestjs/config';
import { LoginResponse } from './dtos/login.dto';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { GetProfileResponse } from './dtos/get-profile.dto';
import { SessionService } from '../session/session.service';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { RefreshTokenResponse } from './dtos/refresh-token.dto';
import dayjs from 'dayjs';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { getResetPasswordRedisKey, RedisService } from '@packages/nest-redis';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { MailerService } from '@packages/nest-mail';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { LoginWithGoogleDto } from './dtos/login-with-google.dto';
import { GoogleService } from '@packages/nest-google';
import { LoginWithFacebookDto } from './dtos/login-with-facebook.dto';
import { FacebookResponseInterface } from './interfaces/facebook-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly sessionService: SessionService,
    private readonly mailerService: MailerService,
    private readonly googleService: GoogleService,
  ) {}

  async registerWithAccount(registerDto: RegisterDto) {
    const { password, email, phone } = registerDto;
    const isExisted = await this.customerService.checkDuplicatedCustomer({
      email,
      phone,
    });

    if (isExisted) {
      throw new BadRequestException('Email of phone is duplicated');
    }

    const hashedPassword = await hashPassword(
      password,
      parseInt(this.configService.get('BCRYPT_SALT_OR_ROUNDS')),
    );

    await this.customerService.createCustomer({
      ...registerDto,
      password: hashedPassword,
    });
  }

  async changePassword(id: string, payload: ChangePasswordDto) {
    const customer = await this.customerService.getCustomerById(id);
    if (!customer) {
      throw new NotFoundException('User not found');
    }

    const { oldPassword, newPassword } = payload;

    if (!(await comparePassword(oldPassword, customer.password))) {
      throw new UnauthorizedException('Current password is incorrect.');
    }

    const hashedPassword = await hashPassword(
      newPassword,
      parseInt(this.configService.get('BCRYPT_SALT_OR_ROUNDS')),
    );

    await this.customerService.updateAccount({
      ...customer,
      password: hashedPassword,
    });

    // Clear all session if password is changed
    await this.sessionService.clearAllSession(customer.id);
  }

  async loginWithPassword(
    email: string,
    password: string,
  ): Promise<LoginResponse> {
    const customer = await this.customerService.getCustomerByEmail(email);

    if (!customer) {
      throw new NotFoundException('User not found');
    }

    if (!customer.isActive) {
      throw new NotFoundException(
        'This account is not active. Please contact admin',
      );
    }

    if (!(await comparePassword(password, customer.password))) {
      throw new BadRequestException('Email or password is incorrect.');
    }

    const sessionId = generateSessionId();
    await this.sessionService.storeSession(customer.id, sessionId);

    return this.generateTokens(customer.id, sessionId);
  }

  async getProfileById(id: string): Promise<GetProfileResponse> {
    const customer = await this.customerService.getCustomerById(id);
    if (!customer) {
      throw new NotFoundException('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, ...response } = customer;
    return response;
  }

  async checkPassword(id: string, password: string) {
    const customer = await this.customerService.getCustomerById(id);

    if (!customer) {
      throw new NotFoundException('User not found');
    }

    if (!(await comparePassword(password, customer.password))) {
      throw new BadRequestException('Password is incorrect.');
    }

    return 'Correct password';
  }

  // Clear all session
  async logout(userId: string) {
    await this.sessionService.clearAllSession(userId);
  }

  async refreshToken(
    id: string,
    currentSessionId: string,
  ): Promise<RefreshTokenResponse> {
    const customer = await this.customerService.getCustomerById(id);
    if (!customer) {
      throw new NotFoundException('User not found');
    }

    await this.sessionService.deleteSession(customer.id, currentSessionId);

    const newSessionId = generateSessionId();
    await this.sessionService.storeSession(customer.id, newSessionId);
    return this.generateTokens(customer.id, newSessionId);
  }

  async forgotPassword(payload: ForgotPasswordDto) {
    // STEP 1: gather customer's info
    const { email } = payload;
    if (!email) {
      throw new BadRequestException('Email is missing');
    }

    const customer = await this.customerService.getCustomerByEmail(email);
    if (!customer) {
      throw new NotFoundException('User not found');
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

    const customer = await this.customerService.getCustomerByEmail(email);
    if (!customer) {
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
    await this.customerService.updateAccount({
      ...customer,
      password: hashedPassword,
    });
    await this.redisService._del(key);

    // Clear all session if users login at other devices
    await this.sessionService.clearAllSession(customer.id);
  }

  async updateAccount(id: string, payload: UpdateAccountDto) {
    const customer = await this.customerService.getCustomerById(id);
    if (!customer) {
      throw new NotFoundException('User not found');
    }

    // Check if phone is duplicated with another account
    const isExisted = await this.customerService.checkDuplicatedPhoneWithOther(
      customer.id,
      payload.phone,
    );

    if (!isExisted) {
      throw new BadRequestException('Phone is duplicated');
    }

    await this.customerService.updateAccount({
      ...customer,
      ...payload,
    });
  }

  //---------------------------- Helpers function ----------------------------
  async generateTokens(id: string, sessionId: string) {
    const dayUnit = 'd';
    const payload = { sub: id, sessionId };
    const now = dayjs();

    const accessTokenDuration = this.configService.get(
      'ACCESS_TOKEN_VALID_DURATION',
    );
    const accessTokenExpiredAt = now
      .add(parseInt(accessTokenDuration), dayUnit)
      .valueOf();
    const accessToken = await this.generateJWT(
      { ...payload, expiredAt: accessTokenExpiredAt },
      this.configService.get('ACCESS_TOKEN_VALID_DURATION') + dayUnit,
    );

    const refreshTokenDuration = this.configService.get(
      'REFRESH_TOKEN_VALID_DURATION',
    );
    const refreshTokenExpiredAt = now
      .add(parseInt(refreshTokenDuration), dayUnit)
      .valueOf();
    const refreshToken = await this.generateJWT(
      { ...payload, expiredAt: refreshTokenExpiredAt },
      this.configService.get('REFRESH_TOKEN_VALID_DURATION') + dayUnit,
    );

    return plainToInstance(LoginResponse, {
      accessToken,
      refreshToken,
    });
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

  async loginWithGoogle(payload: LoginWithGoogleDto) {
    const { accessToken } = payload;
    const googleUser = await this.googleService.authenticate(accessToken);

    let customer = await this.customerService.getCustomerByEmail(
      googleUser.email,
    );

    if (!customer) {
      // Generate a random password, so I use this function too :D don't mind it
      const hashedPassword = await hashPassword(
        generateSessionId(),
        parseInt(this.configService.get('BCRYPT_SALT_OR_ROUNDS')),
      );

      customer = await this.customerService.createAccount({
        email: googleUser.email,
        password: hashedPassword,
        firstName: googleUser.family_name,
        lastName: googleUser.given_name,
        avatarUrl: googleUser.picture,
      });
    }

    const sessionId = generateSessionId();
    await this.sessionService.storeSession(customer.id, sessionId);

    return this.generateTokens(customer.id, sessionId);
  }

  async loginWithFacebook(payload: LoginWithFacebookDto) {
    const fields = 'id,name,email,picture,first_name,last_name';
    // Make a request to Facebook API to retrieve user information
    const response = await fetch(
      `https://graph.facebook.com/me?fields=${fields}&access_token=${payload.accessToken}`,
    );

    const facebookUser: FacebookResponseInterface = await response.json();
    const { error, email, first_name, last_name } = facebookUser;

    if (!!error) {
      throw new BadRequestException(error?.message);
    }
    if (!email) {
      throw new BadRequestException(
        'Please settings email for your Facebook account. We need it to create an account for you.',
      );
    }

    let customer = await this.customerService.getCustomerByEmail(email);

    if (!customer) {
      // Generate a random password, so I use this function too :D don't mind it
      const hashedPassword = await hashPassword(
        generateSessionId(),
        parseInt(this.configService.get('BCRYPT_SALT_OR_ROUNDS')),
      );

      customer = await this.customerService.createCustomer({
        email,
        password: hashedPassword,
        firstName: first_name,
        lastName: last_name,
      });
    }

    const sessionId = generateSessionId();
    await this.sessionService.storeSession(customer.id, sessionId);

    return this.generateTokens(customer.id, sessionId);
  }
}
