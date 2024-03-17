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
import { generateOtp, mapActionsToSubject } from './helpers/otp.helper';
import { SendOtpRequestPayload } from './interfaces/otp.interface';
import { ResetPasswordDto } from './dtos/reset-password.dto';

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

  // send OTP to user
  async forgotPassword(payload: ForgotPasswordDto) {
    const { username, email } = payload;
    if (!payload.username && !payload.email) {
      throw new BadRequestException('Username or email is missing');
    }

    let destination = null;

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

      destination = user.email;
    } else if (!!email) {
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        throw new NotFoundException(
          'This email does not belong to any account.',
        );
      }
      destination = email;
    }

    const otp = generateOtp();
    const content = `Your OTP code to reset password is <b>${otp}</b>`;

    await this.sendOtpRequest({
      otp,
      destination,
      action: VerifyOtpActions.RESET_PASSWORD,
      content,
    });
  }

  async resetPassword(payload: ResetPasswordDto) {
    const { otp, newPassword } = payload;
    const resetPasswordKeyInRedis = await this.redisService.redis.keys(
      `${VerifyOtpActions.RESET_PASSWORD}:*:${otp}`,
    );

    if (resetPasswordKeyInRedis.length === 0) {
      throw new BadRequestException('OTP is invalid');
    }

    const key = resetPasswordKeyInRedis[0];

    // key format: RESET_PASSWORD:[email]:[otp]
    const email = key.split(':')[1];
    const user = await this.userService.getUserByEmail(email);

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

  // send OTP to mail and store it into Redis
  async sendOtpRequest(payload: SendOtpRequestPayload): Promise<void> {
    const { otp, destination, action, content, orderId } = payload;

    await this.mailerService.sendMail({
      to: destination, // list of receivers
      subject: mapActionsToSubject(action), // Subject line
      html: content, // HTML body content
    });

    const key = `${action}:${destination}:${otp}`;
    const createdAt = new Date().getTime();
    await this.redisService.redis.hset(key, {
      createdAt,
      ...(!!orderId ? { orderId } : {}),
    });
  }
}
