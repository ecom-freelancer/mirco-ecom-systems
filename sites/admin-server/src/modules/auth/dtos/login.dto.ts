import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { RegisterDto } from './register.dto';

export class LoginWithPasswordDto {
  @ApiProperty()
  @IsString()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class CreateAccountDto extends RegisterDto {
  @ApiPropertyOptional()
  @IsOptional()
  avatarUrl?: string;
}

export class LoginWithFaceBookDto {
  @ApiProperty()
  @IsString()
  facebookAccessToken: string;
}

export class LoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
