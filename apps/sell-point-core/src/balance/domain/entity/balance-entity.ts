import { ApiProperty } from '@nestjs/swagger';
import { AccountEntity } from '../../../account/domain/entity/account.entity.interface';

export abstract class BalanceEntity {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  account: AccountEntity;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  lastTransactionUuid: string;

  updateAt?: Date;

  deleteAt?: Date;
}
