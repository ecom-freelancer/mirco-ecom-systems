import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  otp: string;

  @ApiProperty()
  @IsString()
  newPassword: string;

  @ApiProperty()
  @IsString()
  email: string;
}
