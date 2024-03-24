import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginWithGoogleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
