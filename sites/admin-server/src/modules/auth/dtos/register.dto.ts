import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

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

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  @Length(0, 255)
  email?: string;
}
