import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { LoginResponse, LoginWithPasswordDto } from './dtos/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse, ApiSuccessResponse } from '@packages/nest-helper';
import { AuthService } from './auth.service';
import { Protected } from './auth.guard';
import { GetProfileResponse } from './dtos/profile.dto';
import { RegisterDto } from './dtos/register.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { RefreshTokenResponse } from './dtos/refresh-token.dto';
import { Request } from 'express';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { CheckPasswordDto } from './dtos/check-password.dto';

@Controller()
@ApiTags('auth')
@ApiBearerAuth('Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @Protected()
  @HttpCode(200)
  @ApiSuccessResponse({ type: GetProfileResponse, status: 200 })
  async getProfile(@Req() req: Request): Promise<GetProfileResponse> {
    // @ts-ignore
    return await this.authService.getProfileById(req.userId);
  }

  @Post('login')
  @HttpCode(200)
  @HttpCode(401)
  @ApiSuccessResponse({ type: LoginResponse, status: 200 })
  async login(@Body() payload: LoginWithPasswordDto): Promise<LoginResponse> {
    return await this.authService.loginWithPassword(
      payload.email,
      payload.password,
    );
  }

  @Post('register')
  @HttpCode(201)
  @ApiErrorResponse({ status: 400 })
  async register(@Body() payload: RegisterDto): Promise<void> {
    return await this.authService.registerWithAccount(payload);
  }

  @Post('login-with-google')
  async loginWithGoogle() {}

  @Post('login-with-facebook')
  async loginWithFacebook() {}

  @Post('change-password')
  @Protected()
  @HttpCode(200)

  // TODO: If password is changed -> Clear all session
  async changePassword(
    @Req() req: Request,
    @Body() payload: ChangePasswordDto,
  ): Promise<void> {
    // @ts-ignore
    return await this.authService.changePassword(req.userId, payload);
  }

  @Post('logout')
  async logout() {}

  @Get('refresh-token')
  @Protected()
  @HttpCode(200)
  @HttpCode(401)
  @ApiSuccessResponse({ type: RefreshTokenResponse, status: 200 })
  // TODO: If token is changed -> Clear all session
  async refreshToken(@Req() req: Request): Promise<RefreshTokenResponse> {
    // @ts-ignore
    return await this.authService.refreshToken(req.userId);
  }

  @Post('forgot-password')
  @HttpCode(200)
  @HttpCode(401)
  @ApiSuccessResponse({ status: 200 })
  async forgotPassword(@Body() payload: ForgotPasswordDto) {
    await this.authService.forgotPassword(payload);
    return 'An email with OTP code has been sent';
  }

  @Post('reset-password')
  @HttpCode(200)
  @HttpCode(401)
  async resetPassword(@Body() payload: ResetPasswordDto) {
    await this.authService.resetPassword(payload);
  }

  @Post('check-password')
  @Protected()
  @HttpCode(200)
  @HttpCode(401)
  @ApiSuccessResponse({ status: 200, message: 'Success' })
  async checkPassword(@Req() req: Request, @Body() payload: CheckPasswordDto) {
    // @ts-ignore
    return await this.authService.checkPassword(req.userId, payload.password);
  }
}
