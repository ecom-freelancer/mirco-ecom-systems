import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UpdateSkuInventoryDto } from './update-sku-inventory.dto';

export class CreateSkuInventoryDto extends UpdateSkuInventoryDto {
  @ApiProperty()
  @IsString()
  sku: string;
}
