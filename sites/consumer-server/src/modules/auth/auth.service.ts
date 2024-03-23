import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  comparePassword,
  generateSessionId,
  hashPassword,
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

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
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
    const user = await this.customerService.getCustomerById(id);
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

    await this.customerService.updateAccount({
      ...user,
      password: hashedPassword,
    });

    // Clear all session if password is changed
    await this.sessionService.clearAllSession(user.id);
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
    const user = await this.customerService.getCustomerById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await comparePassword(password, user.password))) {
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
    const user = await this.customerService.getCustomerById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.sessionService.deleteSession(user.id, currentSessionId);

    const newSessionId = generateSessionId();
    await this.sessionService.storeSession(user.id, newSessionId);
    return this.generateTokens(user.id, newSessionId);
  }

  //---------------------------- Helpers function ----------------------------
  async generateTokens(customerId: string, sessionId: string) {
    const payload = { sub: customerId, sessionId };

    const accessToken = await this.generateJWT(
      payload,
      this.configService.get('JWT_ACCESS_TOKEN_VALID_DURATION'),
    );
    const refreshToken = await this.generateJWT(
      payload,
      this.configService.get('JWT_REFRESH_TOKEN_VALID_DURATION'),
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
}
