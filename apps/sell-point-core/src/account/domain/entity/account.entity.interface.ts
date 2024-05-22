import { ApiProperty } from '@nestjs/swagger';

export abstract class AccountEntity {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  accountNumber: string;

  @ApiProperty()
  description: string;
}
