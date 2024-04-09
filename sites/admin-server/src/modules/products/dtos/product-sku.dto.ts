import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseDto } from 'configs/base.dto';
import { SeoInfoDto } from 'modules/seo-info';

// update product sku dto

export class ProductSkuDto extends BaseDto {
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
  @ApiPropertyOptional({
    isArray: true,
  })
  images?: Array<string>;

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

  @Expose()
  @ApiPropertyOptional()
  seoInfoId?: number;

  @Expose()
  @ApiPropertyOptional({
    type: SeoInfoDto,
  })
  @Type(() => SeoInfoDto)
  seoInfo?: SeoInfoDto;
}

export class ProductSkuDetailDto extends BaseDto {}

export class GetListProductSkuDto {
  @Expose()
  @Type(() => ProductSkuDto)
  items: ProductSkuDto[];
}
