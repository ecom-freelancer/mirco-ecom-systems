import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from 'configs/base.dto';

// update product sku dto

export class ProductSkuDto {
  @Expose()
  @ApiProperty()
  sku: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  slug: string;

  @Expose()
  @ApiPropertyOptional()
  sellable?: boolean;

  @Expose()
  @ApiPropertyOptional()
  sellPrice?: number;

  @Expose()
  @ApiPropertyOptional()
  listPrice?: number;

  @Expose()
  @ApiPropertyOptional()
  variantId?: number;
}

export class ProductSkuDetailDto extends BaseDto {}
