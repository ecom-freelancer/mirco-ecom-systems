import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ProductAttributeDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  showNameInConsumer: boolean;

  @Expose()
  @ApiProperty()
  order: number;

  @Expose()
  @ApiPropertyOptional()
  productId?: number;

  @Expose()
  @ApiPropertyOptional({
    type: () => AttributeOptionDto,
    isArray: true,
  })
  @Type(() => AttributeOptionDto)
  options: Array<AttributeOptionDto>;
}

export class AttributeOptionDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  order: number;

  @Expose()
  @ApiPropertyOptional()
  attributeId: number;

  @Expose()
  @ApiPropertyOptional()
  amount?: number;
}
