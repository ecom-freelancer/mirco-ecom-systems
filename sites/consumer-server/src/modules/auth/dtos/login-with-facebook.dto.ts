import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginWithFacebookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
