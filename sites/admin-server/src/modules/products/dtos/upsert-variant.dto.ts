import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UpsertVariantDto {
  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  id?: number;

  @ApiPropertyOptional({
    type: () => VariantOptionDto,
    isArray: true,
  })
  @Type(() => VariantOptionDto, {})
  @ValidateNested({ each: true })
  items: VariantOptionDto[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sku?: string;
}

export class VariantOptionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  id: number;

  @IsInt()
  @ApiProperty()
  attributeId: number;

  @ApiProperty()
  @IsInt()
  attributeOptionId: number;
}
