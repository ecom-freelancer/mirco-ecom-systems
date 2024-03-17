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

  async testRedis() {
    await this.redisService.redis.keys('*');
    await this.mailerService
      .sendMail({
        to: 'quanganhpham31101998@gmail.com', // list of receivers
        from: 'quanganhpham31101998@gmail.com', // sender address
        subject: 'Meow meow', // Subject line
        text: 'Xin trào', // plaintext body
        html: '<b>Xin trào</b>', // HTML body content
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
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

  async generateJWT(payload, expiresIn = '1d') {
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
}
