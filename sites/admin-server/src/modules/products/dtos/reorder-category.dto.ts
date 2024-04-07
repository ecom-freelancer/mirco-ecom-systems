import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ReorderCategoryDto {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryOrderDto)
  newOrder: CategoryOrderDto[];
}

class CategoryOrderDto {
  @IsNumber()
  id: number;

  @IsNumber()
  order: number;
}
