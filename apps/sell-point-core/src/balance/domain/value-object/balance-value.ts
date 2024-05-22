import { v4 as uuid4 } from 'uuid';
import { BalanceEntity } from '../entity/balance-entity.interface';

export class BalanceValue implements BalanceEntity {
  uuid: string;
  accountUuid: string;
  amount: number;
  lastTransactionUuid: string;

  constructor(accountUuid: string, amount: number, lastTransactionUuid: string) {
    this.uuid = uuid4();
    this.accountUuid = accountUuid;
    this.amount = amount;
    this.lastTransactionUuid = lastTransactionUuid;
  }
}
