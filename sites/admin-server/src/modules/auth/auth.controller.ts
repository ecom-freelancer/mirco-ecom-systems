import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResponse } from './dtos/login.dto';
import { plainToInstance } from 'class-transformer';
import { ApiSuccessResponse } from '@packages/nest-helper';

@Controller({
  version: '1',
})
@ApiTags('Authorize')
export class AuthController {
  constructor() {}

  @Post('/login')
  @HttpCode(200)
  @ApiSuccessResponse({
    status: 200,
    type: LoginResponse,
    message: 'Login success',
  })
  async login(@Body() body: LoginDto): Promise<LoginResponse> {
    return plainToInstance(LoginResponse, {
      token: 'Bearer',
      refreshToken: 'Bearer',
    });
  }
}
