import { ApiProperty } from '@nestjs/swagger';

export abstract class BalanceEntity {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  lastTransactionUuid: string;

  updateAt?: Date;

  deleteAt?: Date;
}
