import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class LoginWithPasswordDto {
  @ApiProperty()
  @IsString()
  username: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class RegisterPayloadDto {
  @ApiProperty()
  @IsString()
  @Length(0, 255)
  password: string;

  @ApiProperty()
  @IsString()
  @Length(0, 255)
  username: string;

  @ApiProperty()
  @IsString()
  @Length(0, 255)
  name: string;
}

export class CreateAccountPayloadDto extends RegisterPayloadDto {
  @ApiPropertyOptional()
  @IsOptional()
  avatarUrl?: string;
}

export class LoginWithFaceBookDto {
  @ApiProperty()
  @IsString()
  facebookAccessToken: string;
}

export class LoginWithGoogleDto {
  @ApiProperty()
  @IsString()
  googleAccessToken: string;
}

export class LoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class JwtPayload {
  username: string;
  sub: string;
}
