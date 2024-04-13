import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { InventoryStatus } from '@packages/nest-mysql';
import { GetInventoryEntityDetailResponse } from './get-inventory-entity-detail.dto';

export class UpdateInventoryEntityDto {
  @ApiProperty()
  @IsEnum(InventoryStatus)
  status: InventoryStatus;
}

export class UpdateInventoryEntityResponse extends GetInventoryEntityDetailResponse {}
