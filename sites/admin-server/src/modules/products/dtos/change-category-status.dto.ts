import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeCategoryDisplayDto {
  @ApiProperty()
  @IsBoolean()
  display: boolean;
}
