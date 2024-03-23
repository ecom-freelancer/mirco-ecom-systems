import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckPasswordDto {
  @ApiProperty()
  @IsString()
  password: string;
}
