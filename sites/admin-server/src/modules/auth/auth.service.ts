import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { LoginResponse } from './dtos/login.dto';
import { JwtPayload } from './interfaces/jwt.interface';
import { UserEntity } from '@packages/nest-mysql';
import { ConfigService } from '@nestjs/config';
import { GetProfileResponse } from './dtos/profile.dto';
import { RegisterDto } from './dtos/register.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { RefreshTokenResponse } from './dtos/refresh-token.dto';
import { RedisService } from '@packages/nest-redis';
import { MailerService } from '@packages/nest-mail';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { VerifyOtpActions } from './constants/otp.constant';
import {
  generateOtp,
  getResetPasswordRedisKey,
  mapActionsToSubject,
} from './helpers/otp.helper';
import { SendEmailPayload } from './interfaces/otp.interface';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly mailerService: MailerService,
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
    username: string,
    password: string,
  ): Promise<LoginResponse> {
    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await this.comparePassword(password, user.password))) {
      throw new UnauthorizedException('Username or password is incorrect.');
    }

    return this.generateTokens(user);
  }

  async registerWithAccount(registerDto: RegisterDto) {
    const { username, password, email } = registerDto;

    const duplicatedUser = await this.userService.checkDuplicatedUser({
      username,
      email,
    });

    if (duplicatedUser) {
      throw new BadRequestException('User is duplicated');
    }

    const hashedPassword = await this.hashPassword(password);
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

    if (!(await this.comparePassword(oldPassword, user.password))) {
      throw new UnauthorizedException('Current password is incorrect.');
    }

    const hashedPassword = await this.hashPassword(newPassword);
    await this.userService.updateAccount({ ...user, password: hashedPassword });
  }

  async refreshToken(id: string): Promise<RefreshTokenResponse> {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.generateTokens(user);
  }

  async forgotPassword(payload: ForgotPasswordDto) {
    // STEP 1: gather user's info
    const { username, email } = payload;
    if (!payload.username && !payload.email) {
      throw new BadRequestException('Username or email is missing');
    }

    let destination = null;
    let account = '';

    if (!!username) {
      const user = await this.userService.getUserByUsername(username);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!user.email) {
        throw new NotFoundException(
          'Email has not been set up in this account, please contact admin',
        );
      }

      account = user.username;
      destination = user.email;
    } else if (!!email) {
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        throw new NotFoundException(
          'This email does not belong to any account.',
        );
      }

      account = email;
      destination = email;
    }

    // Step 2: store OTP into Redis
    const otp = generateOtp();
    const key = getResetPasswordRedisKey(account);
    const isExisted = await this.redisService.redis.exists(key);

    const now = dayjs();

    if (!isExisted) {
      // If users have not sent any request before -> Just store it
      await this.redisService.redis.hset(key, {
        otp,
        requestAttemptTimestamp: JSON.stringify([now.valueOf()]),
        verifyAttemptCount: 0,
      });
    } else {
      // Todo: If users has sent a request before -> Check
    }

    // Step 3: send email to users

    const content = `Your OTP code to reset password is <b>${otp}</b>`;
    await this.sendEmail({
      destination,
      content,
      action: VerifyOtpActions.RESET_PASSWORD,
    });
  }

  // verify OTP and reset password
  async resetPassword(payload: ResetPasswordDto) {
    const { otp, newPassword, account } = payload;
    const key = getResetPasswordRedisKey(account);

    const isExisted = await this.redisService.redis.exists(key);
    if (!isExisted) {
      throw new BadRequestException('OTP is invalid');
    }

    const verifyOtpCurrentInfo = await this.redisService.redis.hgetall(key);
    const now = dayjs();

    const requestAttemptTimestamp = JSON.parse(
      verifyOtpCurrentInfo.requestAttemptTimestamp,
    );
    const lastRequestTimestamp = dayjs(
      requestAttemptTimestamp[requestAttemptTimestamp.length - 1],
    );

    const validTime = lastRequestTimestamp.add(
      parseInt(this.configService.get('OTP_VALID_DURATION')),
      'minute',
    );

    // Check all verification failed cases
    if (now.isAfter(validTime)) {
      throw new BadRequestException(
        'OTP is expired. Please send a new Reset password OTP request.',
      );
    }

    if (parseInt(verifyOtpCurrentInfo.verifyAttemptCount) === 3) {
      throw new BadRequestException(
        'You have exceeded the number of OTP verification. Please send a new Reset password OTP request.',
      );
    }

    if (verifyOtpCurrentInfo.otp !== otp) {
      await this.redisService.redis.hset(key, [
        'verifyAttemptCount',
        parseInt(verifyOtpCurrentInfo.verifyAttemptCount) + 1,
      ]);
      throw new BadRequestException('OTP is incorrect.');
    }

    const user =
      (await this.userService.getUserByEmail(account)) ||
      (await this.userService.getUserByUsername(account));

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await this.hashPassword(newPassword);
    await this.userService.updateAccount({ ...user, password: hashedPassword });
    await this.redisService.redis.del(key);
  }

  //---------------------------- Helpers function ----------------------------

  async generateTokens(user: UserEntity) {
    const payload: JwtPayload = { sub: user.id };

    const accessToken = await this.generateJWT(payload);
    const refreshToken = await this.generateJWT(payload, '7d');

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

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = parseInt(
      this.configService.get('BCRYPT_SALT_OR_ROUNDS'),
    );
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
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
