import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BaseDto {
  @ApiPropertyOptional()
  @Expose()
  createdAt?: Date;

  @Expose()
  @ApiPropertyOptional({
    type: Date,
  })
  updatedAt?: Date;
}

export class UpsertDto {
  @ApiPropertyOptional()
  @Expose()
  id?: number;
}
