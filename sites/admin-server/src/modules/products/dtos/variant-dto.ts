import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttributeDto, AttributeOptionDto } from './product-attribute.dto';
import { ProductSkuDto } from './product-sku.dto';
import { Expose, Type } from 'class-transformer';

export class VariantDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiPropertyOptional()
  @Expose()
  sku: string;

  @ApiPropertyOptional({
    type: () => ProductSkuDto,
  })
  @Expose()
  @Type(() => ProductSkuDto)
  productSku?: ProductSkuDto;

  @ApiPropertyOptional({
    type: () => VariantItemDto,
    isArray: true,
  })
  @Expose()
  @Type(() => VariantItemDto)
  items: VariantItemDto[];
}

export class VariantItemDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  attributeId: number;
  @Expose()
  @ApiProperty()
  attributeOptionId: number;

  @Expose()
  @ApiPropertyOptional({
    type: () => AttributeDto,
  })
  @Type(() => AttributeDto)
  attribute?: AttributeDto;

  @Expose()
  @ApiPropertyOptional({
    type: () => AttributeOptionDto,
  })
  @Type(() => AttributeOptionDto)
  attributeOption?: AttributeOptionDto;
}

export class ListVariantsDto {
  @ApiProperty({
    type: () => VariantDto,
    isArray: true,
  })
  @Expose()
  @Type(() => VariantDto, {})
  variants: VariantDto[];
}
