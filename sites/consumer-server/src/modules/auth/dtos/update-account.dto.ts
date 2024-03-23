import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateAccountDto {
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
}
