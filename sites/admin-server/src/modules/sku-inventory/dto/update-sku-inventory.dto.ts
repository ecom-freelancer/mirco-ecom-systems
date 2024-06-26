import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateSkuInventoryDto {
  @ApiProperty()
  @IsNumber()
  totalAvailable: number;
}
