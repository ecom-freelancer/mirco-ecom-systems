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
import {
  JwtPayload,
  LoginResponse,
  RegisterPayloadDto,
} from './dtos/login.dto';
import { UserEntity } from '@packages/nest-mysql';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async loginWithPassword(
    username: string,
    password: string,
  ): Promise<LoginResponse> {
    const user = await this.userService.findOneByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await this.comparePassword(password, user?.password))) {
      throw new UnauthorizedException('Username or password is incorrect.');
    }

    return this.generateTokens(user);
  }

  async registerWithAccount(registerDto: RegisterPayloadDto) {
    const { username, password } = registerDto;

    const duplicatedUser = await this.userService.findOneByUsername(username);

    if (duplicatedUser) {
      throw new BadRequestException('User is duplicated');
    }

    const hashedPassword = await this.hashPassword(password);
    await this.userService.createAccount({
      ...registerDto,
      password: hashedPassword,
    });
  }

  async generateTokens(user: UserEntity) {
    const payload: JwtPayload = { username: user.username, sub: user.id };

    const accessToken = await this.generateJWT(payload);
    const refreshToken = await this.generateJWT(payload, '7d');

    return plainToInstance(LoginResponse, {
      accessToken,
      refreshToken,
    });
  }

  async verifyAsync(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      return payload;
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

  async hashPassword(password: string, saltOrRounds = 10): Promise<string> {
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
