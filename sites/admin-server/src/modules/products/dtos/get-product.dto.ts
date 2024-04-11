import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProductStatus } from '@packages/nest-mysql';

export class GetProductListParams {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  pageSize?: number = 10;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  searchText?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  productStatus?: ProductStatus[];
}

export class GetProductListResponse {
  @ApiProperty()
  @Expose()
  @IsNumber()
  totalRecord: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  totalPage: number;

  @ApiProperty()
  @Expose()
  @IsArray()
  @Type(() => ProductDto)
  dataList: ProductDto[];
}

export class ProductDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @IsString()
  @Expose()
  slug: string;

  @ApiProperty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty()
  @IsString()
  @Expose()
  brand: string;

  @ApiProperty()
  @IsArray()
  @Expose()
  images: string;

  @ApiProperty()
  @IsArray()
  @Expose()
  keywords: string;

  @ApiProperty()
  @Expose()
  productStatus: ProductStatus;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
