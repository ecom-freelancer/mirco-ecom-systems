import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { SkuInventoriesEntity } from '@packages/nest-mysql';

export class GetSkuInventoryListQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  productId?: number;
}

export type GetSkuInventoryListResponse = SkuInventoriesEntity[];
