import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common';
import {
  LoginResponse,
  LoginWithPasswordDto,
  RegisterPayloadDto,
} from './dtos/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse, ApiSuccessResponse } from '@packages/nest-helper';
import { AuthService } from './auth.service';
import { Protected } from './auth.guard';
import { GetProfileResponse } from './dtos/profile.dto';

@Controller()
@ApiTags('auth')
@ApiBearerAuth('Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @HttpCode(200)
  @Protected()
  @ApiSuccessResponse({ type: GetProfileResponse, status: 200 })
  async getProfile(@Request() req): Promise<GetProfileResponse> {
    return await this.authService.getProfileById(req.userId);
  }

  @Post('login')
  @HttpCode(200)
  @HttpCode(401)
  @ApiSuccessResponse({ type: LoginResponse, status: 200 })
  async login(@Body() payload: LoginWithPasswordDto) {
    return await this.authService.loginWithPassword(
      payload.username,
      payload.password,
    );
  }

  @Post('register')
  @HttpCode(201)
  @ApiErrorResponse({ status: 400 })
  async register(@Body() payload: RegisterPayloadDto) {
    return await this.authService.registerWithAccount(payload);
  }

  @Post('login-with-google')
  async loginWithGoogle() {}

  @Post('login-with-facebook')
  async loginWithFacebook() {}

  @Post('change-password')
  @HttpCode(201)
  @Protected()
  async changePassword() {}

  @Post('logout')
  async logout() {}

  @Post('refresh-token')
  async refreshToken() {}

  @Post('forgot-password')
  async forgotPassword() {}
}
