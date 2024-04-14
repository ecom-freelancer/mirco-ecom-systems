import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { InventoryStatus } from '@packages/nest-mysql';

export class GetSkuInventoryDetailResponse {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  sku: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  totalAvailable: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  totalVolume: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  soldQuantity: number;

  @ApiProperty()
  @Expose()
  @IsObject()
  countDetail: Record<InventoryStatus, number>;
}
