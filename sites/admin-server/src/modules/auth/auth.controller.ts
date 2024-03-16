import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import {
  LoginResponse,
  LoginWithPasswordDto,
  RegisterPayloadDto,
} from './dtos/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse, ApiSuccessResponse } from '@packages/nest-helper';
import { AuthService } from './auth.service';
import { Protected } from './auth.guard';

@Controller()
@ApiTags('auth')
@ApiBearerAuth('Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @Protected()
  async getProfile() {}

  @Post('login')
  @HttpCode(200)
  @HttpCode(401)
  @ApiSuccessResponse({ type: LoginResponse, status: 200 })
  async login(@Body() payload: LoginWithPasswordDto) {
    return this.authService.loginWithPassword(
      payload.username,
      payload.password,
    );
  }

  @Post('register')
  @HttpCode(201)
  @ApiErrorResponse({ status: 400 })
  async register(@Body() payload: RegisterPayloadDto) {
    return this.authService.registerWithAccount(payload);
  }

  @Post('login-with-google')
  async loginWithGoogle() {}

  @Post('login-with-facebook')
  async loginWithFacebook() {}

  @Post('change-password')
  async changePassword() {}

  @Post('logout')
  async logout() {}

  @Post('refresh-token')
  async refreshToken() {}

  @Post('forgot-password')
  async forgotPassword() {}
}
