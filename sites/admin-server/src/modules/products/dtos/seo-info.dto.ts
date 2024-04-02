import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsString()
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
  canonical?: string;
}
