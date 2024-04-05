import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductDeliveryType, ProductStatus } from '@packages/nest-mysql';
import { UpsertSeoInfoDto } from './seo-info.dto';
import {
  IsOptional,
  IsNumber,
  IsString,
  MaxLength,
  IsEnum,
  IsArray,
  ValidateNested,
  IsBoolean,
  ArrayNotEmpty,
  IsUrl,
} from 'class-validator';
import { IsJsonString, IsSlug } from '@packages/nest-helper';
import { Type } from 'class-transformer';

export class UpsertProductDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsString()
  @IsSlug()
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty()
  @IsNumber()
  categoryId: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsJsonString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl(
    {},
    {
      each: true,
    },
  )
  images: Array<string>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsJsonString()
  userManual?: string;

  @ApiPropertyOptional({
    enum: ProductStatus,
    default: ProductStatus.draft,
  })
  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @ApiPropertyOptional({
    enum: ProductDeliveryType,
  })
  @IsEnum(ProductDeliveryType)
  deliveryType?: ProductDeliveryType;

  @ApiPropertyOptional({
    isArray: true,
  })
  @IsString({
    each: true,
  })
  @IsOptional()
  keywords?: Array<string>;

  @ApiPropertyOptional({
    type: () => UpsertProductAttributeDto,
    isArray: true,
  })
  @Type(() => UpsertProductAttributeDto)
  @IsArray()
  @ValidateNested({
    each: true,
  })
  attributes?: Array<UpsertProductAttributeDto>;

  @ApiPropertyOptional({
    type: UpsertSeoInfoDto,
    nullable: true,
  })
  @Type(() => UpsertSeoInfoDto)
  @ValidateNested()
  seoInfo?: UpsertSeoInfoDto;
}

export class UpsertProductAttributeDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  order: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  showNameInConsumer?: boolean;

  @ApiProperty({
    type: () => UpsertProductAttributeOptionDto,
    isArray: true,
  })
  @Type(() => UpsertProductAttributeOptionDto)
  @ValidateNested({
    each: true,
  })
  @IsArray()
  @ArrayNotEmpty({})
  options: Array<UpsertProductAttributeOptionDto>;
}

export class UpsertProductAttributeOptionDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsNumber()
  order: number;

  @ApiProperty()
  @IsString()
  name: string;
}
