import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum } from 'class-validator';
import { ProductStatus } from '@packages/nest-mysql';

export class BatchUpdateStatusDto {
  @ApiProperty()
  @IsArray()
  ids: number[];

  @ApiProperty()
  @IsEnum(ProductStatus)
  status: ProductStatus;
}
