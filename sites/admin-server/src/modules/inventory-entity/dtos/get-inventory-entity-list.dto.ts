import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { InventoryStatus } from '@packages/nest-mysql';
import { InventoryEntityDto } from './inventory-entity.dto';

export class GetInventoryEntityListQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  pageSize?: number = 10;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  status?: InventoryStatus[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  endDate?: Date;
}

export class GetInventoryEntityListResponse {
  totalPage: number;
  totalRecord: number;
  dataList: Array<InventoryEntityDto>;
}
