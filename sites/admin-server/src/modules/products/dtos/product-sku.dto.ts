import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from 'configs/base.dto';

// update product sku dto

export class ProductSkuDto {
  @Expose()
  @ApiProperty()
  sku: string;
}

export class ProductSkuDetailDto extends BaseDto {}
