import { ProductDeliveryType, ProductStatus } from '@packages/nest-mysql';
import { BaseDto } from 'configs/base.dto';
import { SeoInfoDto } from 'modules/seo-info';
import { ProductSkuDto } from './product-sku.dto';
import { ProductCategoryDto } from './category.dto';
import { Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductAttributeDto } from './product-attribute.dto';

export class ProductDetailDto extends BaseDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  slug: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiPropertyOptional()
  description: string;

  @Expose()
  @ApiPropertyOptional()
  userManual: string;

  @Expose()
  @ApiPropertyOptional()
  images?: Array<string>;

  @Expose()
  @ApiPropertyOptional()
  brand: string;

  @Expose()
  @ApiProperty()
  categoryId: number;

  @Expose()
  @ApiPropertyOptional({
    type: ProductCategoryDto,
  })
  @Type(() => ProductCategoryDto)
  category?: ProductCategoryDto;

  @Expose()
  @ApiProperty({
    enum: ProductStatus,
  })
  status: ProductStatus;

  @Expose()
  @ApiPropertyOptional({
    enum: ProductDeliveryType,
  })
  deliveryType: ProductDeliveryType;

  @Expose()
  @ApiPropertyOptional()
  seoInfoId: number;

  @Expose()
  @Type(() => SeoInfoDto)
  @ApiPropertyOptional({
    type: SeoInfoDto,
  })
  seoInfo?: SeoInfoDto;

  @Expose()
  @Type(() => SeoInfoDto)
  @ApiPropertyOptional({
    type: SeoInfoDto,
    isArray: true,
  })
  skus?: ProductSkuDto[];

  @Expose()
  @Type(() => ProductAttributeDto)
  @ApiPropertyOptional({
    type: ProductAttributeDto,
    isArray: true,
  })
  attributes?: ProductAttributeDto[];
}
