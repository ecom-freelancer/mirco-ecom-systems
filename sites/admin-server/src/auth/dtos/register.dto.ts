import { IsString, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
