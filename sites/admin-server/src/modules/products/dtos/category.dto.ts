import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductCategoryDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  code: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  order?: number;

  @ApiProperty()
  @Expose()
  image?: string;

  @ApiProperty()
  @Expose()
  display?: boolean;

  @ApiProperty({
    type: () => [ProductCategoryDto],
  })
  @Expose()
  @Type(() => ProductCategoryDto)
  items: ProductCategoryDto[];

  @ApiProperty()
  @Expose()
  parentId: number;
}
// API
// getCategories
export class GetCategoriesDto {
  @ApiProperty({
    type: ProductCategoryDto,
  })
  @Expose()
  @Type(() => ProductCategoryDto)
  categories: ProductCategoryDto[];
}

export class CategoryPayloadDto {
  @ApiPropertyOptional()
  @IsNumber({})
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  display?: boolean;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  parentId?: number;
}
