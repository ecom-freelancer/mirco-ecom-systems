import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoginResponse, LoginWithPasswordDto } from './dtos/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  SessionId,
  UserId,
} from '@packages/nest-helper';
import { AuthService } from './auth.service';
import { Protected } from './auth.guard';
import { GetProfileResponse } from './dtos/profile.dto';
import { RegisterDto } from './dtos/register.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { RefreshTokenResponse } from './dtos/refresh-token.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { CheckPasswordDto } from './dtos/check-password.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { LoginWithGoogleDto } from './dtos/login-with-google.dto';
import { FacebookAuthGuard } from '@packages/nest-facebook';

@Controller()
@ApiTags('auth')
@ApiBearerAuth('Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @Protected()
  @HttpCode(200)
  @ApiSuccessResponse({ type: GetProfileResponse, status: 200 })
  async getProfile(@UserId() userId: string): Promise<GetProfileResponse> {
    return await this.authService.getProfileById(userId);
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
  @HttpCode(200)
  @HttpCode(401)
  @ApiSuccessResponse({ type: LoginResponse, status: 200 })
  async loginWithGoogle(@Body() payload: LoginWithGoogleDto) {
    return await this.authService.loginWithGoogle(payload);
  }

  @Get('/facebook')
  @UseGuards(FacebookAuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('login-with-facebook')
  @UseGuards(FacebookAuthGuard('facebook'))
  async loginWithFacebook(@Req() req: Request) {
    // @ts-ignore
    return { statusCode: HttpStatus.OK, data: req.user };
  }

  @Post('change-password')
  @Protected()
  @HttpCode(200)
  @ApiSuccessResponse({ status: 200 })
  async changePassword(
    @UserId() userId: string,
    @Body() payload: ChangePasswordDto,
  ): Promise<string> {
    await this.authService.changePassword(userId, payload);
    return 'Change password success. Please login again.';
  }

  @Post('logout')
  @Protected()
  @HttpCode(200)
  @ApiSuccessResponse({ status: 200 })
  async logout(@UserId() userId: string): Promise<void> {
    await this.authService.logout(userId);
  }

  @Get('refresh-token')
  @Protected()
  @HttpCode(200)
  @HttpCode(401)
  @ApiSuccessResponse({ type: RefreshTokenResponse, status: 200 })
  async refreshToken(
    @UserId() userId: string,
    @SessionId() sessionId: string,
  ): Promise<RefreshTokenResponse> {
    return await this.authService.refreshToken(userId, sessionId);
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
  @ApiSuccessResponse({ status: 200 })
  async resetPassword(@Body() payload: ResetPasswordDto): Promise<string> {
    await this.authService.resetPassword(payload);
    return 'Reset password success. Please login again.';
  }

  @Post('check-password')
  @Protected()
  @HttpCode(200)
  @HttpCode(401)
  @ApiSuccessResponse({ status: 200, message: 'Success' })
  async checkPassword(
    @UserId() userId: string,
    @Body() payload: CheckPasswordDto,
  ) {
    return await this.authService.checkPassword(userId, payload.password);
  }

  @Put('update-account')
  @Protected()
  @HttpCode(200)
  @HttpCode(401)
  @ApiSuccessResponse({ status: 200, message: 'Success' })
  async updateAccount(
    @UserId() userId: string,
    @Body() payload: UpdateAccountDto,
  ) {
    return await this.authService.updateAccount(userId, payload);
  }
}
