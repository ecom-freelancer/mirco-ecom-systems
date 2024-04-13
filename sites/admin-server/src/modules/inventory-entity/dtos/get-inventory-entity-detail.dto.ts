import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { InventoryStatus } from '@packages/nest-mysql';
import { Expose } from 'class-transformer';

export class GetInventoryEntityDetailResponse {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  barCode: string;

  @ApiProperty()
  @Expose()
  @IsEnum(InventoryStatus)
  status: InventoryStatus;

  @ApiProperty()
  @Expose()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  @IsDate()
  updatedAt: Date;
}
