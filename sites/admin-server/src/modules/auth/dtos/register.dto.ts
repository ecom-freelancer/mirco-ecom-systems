import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class RegisterDto {
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
