import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { InventoryStatus } from '@packages/nest-mysql';

export class CreateInventoryEntityDto {
  @ApiProperty()
  @IsString()
  barCode: string;

  @ApiProperty()
  @IsEnum(InventoryStatus)
  status: InventoryStatus;

  @ApiProperty()
  @IsNumber()
  skuInventoryId: number;
}
