import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpsertSeoInfoDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  shortDescription?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  keywords?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  noIndex?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsUrl()
  canonical?: string;
}

export class SeoInfoDto {
  @ApiPropertyOptional()
  @Expose()
  id?: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  shortDescription?: string;

  @ApiProperty()
  @Expose()
  image?: string;

  @ApiPropertyOptional()
  @Expose()
  keywords?: string[];

  @ApiPropertyOptional()
  @Expose()
  noIndex?: boolean = true;

  @ApiProperty()
  @Expose()
  canonical?: string;
}
