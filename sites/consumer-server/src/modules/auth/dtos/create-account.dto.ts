import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { RegisterDto } from './register.dto';

export class CreateAccountDto extends RegisterDto {
  @ApiPropertyOptional()
  @IsOptional()
  avatarUrl?: string;
}
