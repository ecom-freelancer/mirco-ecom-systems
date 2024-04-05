import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { BaseDto } from 'configs/base.dto';

export class UpsertSeoInfoDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  shortDescription?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  noIndex?: boolean = true;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsUrl()
  canonical?: string;
}

export class SeoInfoDto extends BaseDto {
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
