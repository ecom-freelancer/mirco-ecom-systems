import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export interface IResponse<T = any> {
  status: number;
  message: string;
  data?: T;
  errors: any;
}

export class ApiResponseDto {
  @ApiProperty({
    type: 'number',
  })
  status: number;

  @ApiPropertyOptional({
    type: 'string',
  })
  message?: string;
}
