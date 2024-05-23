import { v4 as uuid4 } from 'uuid';
import { BalanceEntity } from '../entity/balance-entity';
import { AccountEntity } from 'apps/sell-point-core/src/account/domain/entity/account.entity.interface';

export class BalanceValue implements BalanceEntity {
  uuid: string;
  account: AccountEntity;
  amount: number;
  lastTransactionUuid: string;

  constructor(account: AccountEntity, amount: number, lastTransactionUuid?: string) {
    this.uuid = uuid4();
    this.account = account;
    this.amount = amount;
    this.lastTransactionUuid = lastTransactionUuid ? lastTransactionUuid : null;
  }
}
