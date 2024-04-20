import { IsNotEmpty, IsString } from 'class-validator';

export class IndexDto {
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  client_id: string;

  @IsString()
  @IsNotEmpty()
  code_challenge: string;
}
