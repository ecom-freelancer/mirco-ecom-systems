import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  @Length(0, 255)
  email: string;

  @ApiProperty()
  @IsString()
  @Length(0, 255)
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(0, 255)
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(0, 255)
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(7, 15)
  phone: string;

  // TODO: avatar
}
