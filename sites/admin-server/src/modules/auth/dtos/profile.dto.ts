import { ApiProperty } from '@nestjs/swagger';

export class GetProfileResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  email?: string;
}
