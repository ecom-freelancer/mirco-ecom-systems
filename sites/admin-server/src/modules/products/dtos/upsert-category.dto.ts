import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UpsertSeoInfoDto } from 'modules/seo-info';

export class UpsertCategoryDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

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
  display?: boolean = true;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  parentId?: number;

  seoInfo?: UpsertSeoInfoDto;
}
