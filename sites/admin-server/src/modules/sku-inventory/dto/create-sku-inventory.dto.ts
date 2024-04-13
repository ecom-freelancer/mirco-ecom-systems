import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateSkuInventoryDto {
  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsNumber()
  totalAvailable?: number = 0;
}
