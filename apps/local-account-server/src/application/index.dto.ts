import { IsNotEmpty, IsString } from 'class-validator';

export class IndexDto {
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  clientID: string;

  @IsString()
  @IsNotEmpty()
  redirectUri: string;
}
