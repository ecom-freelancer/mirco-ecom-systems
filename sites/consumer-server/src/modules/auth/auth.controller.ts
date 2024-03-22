import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  UserId,
} from '@packages/nest-helper';
import { RegisterDto } from './dtos/register.dto';
import { LoginResponse, LoginWithPasswordDto } from './dtos/login.dto';
import { Protected } from './auth.guard';
import { GetProfileResponse } from './dtos/get-profile.dto';

@Controller('')
@ApiTags('auth')
@ApiBearerAuth('Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  @ApiErrorResponse({ status: 400 })
  async register(@Body() payload: RegisterDto): Promise<void> {
    return await this.authService.registerWithAccount(payload);
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

  @Get('me')
  @Protected()
  @HttpCode(200)
  @ApiSuccessResponse({ type: GetProfileResponse, status: 200 })
  async getProfile(@UserId() userId: string): Promise<GetProfileResponse> {
    return await this.authService.getProfileById(userId);
  }
}
