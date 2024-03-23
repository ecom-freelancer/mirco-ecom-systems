import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateAccountDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(0, 255)
  name: string;
}
