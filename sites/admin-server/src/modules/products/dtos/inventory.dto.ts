import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class InventoryDto {
  id?: number;
}

export class ImportInventorySkuPayload {
  @ApiProperty()
  @IsUrl()
  googleSheetUrl: string;

  @ApiProperty()
  @IsString()
  sku: string;
}

export class GetInventoryQueries {
  @ApiProperty()
  @IsString()
  sku: string;

  @ApiPropertyOptional({
    default: 1,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    default: 10,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Max(100)
  pageSize?: number = 10;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  onlyActive?: boolean;
}
