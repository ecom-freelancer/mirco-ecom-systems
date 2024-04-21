import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { InventoryStatus } from '@packages/nest-mysql';
import { InventoryEntityDto } from './inventory-entity.dto';

export class UpdateInventoryEntityDto {
  @ApiProperty()
  @IsEnum(InventoryStatus)
  status: InventoryStatus;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  barCode: string;

  @ApiProperty()
  @IsNumber()
  skuInventoryId: number;
}

export class UpdateInventoryEntityResponse extends InventoryEntityDto {}
