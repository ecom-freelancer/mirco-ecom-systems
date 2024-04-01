import { ApiProperty } from '@nestjs/swagger';

export class ImageResponseDto {
  @ApiProperty()
  url: string;

  @ApiProperty()
  id: string;
}
