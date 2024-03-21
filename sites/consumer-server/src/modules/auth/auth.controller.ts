import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ApiErrorResponse } from '@packages/nest-helper';
import { RegisterDto } from './dtos/register.dto';

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
}
