import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsSlug } from '@packages/nest-helper';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class UpsertSKUDto {
  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl(
    {},
    {
      each: true,
    },
  )
  images?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  sellable?: boolean = false;

  @ApiProperty()
  @IsSlug()
  slug: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  variantId?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  sellPrice: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @IsOptional()
  listPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  seoInfoId?: number;
}
