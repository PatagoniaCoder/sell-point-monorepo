import { v4 as uuid4 } from 'uuid';
import { EntityBalance } from '../entity/entity-balance';
import { DecimalValueObject } from './decimal.value';

export class BalanceValue implements EntityBalance {
  uuid: string;
  accountUuid: string;
  balanceAmountBefore: number;
  balanceAmountAfter: number;
  amount: number;

  constructor(
    accountUuid: string,
    balanceAmountBefore: number,
    balanceAmountAfter: number,
    amount: number,
  ) {
    this.uuid = uuid4();
    this.accountUuid = accountUuid;
    this.balanceAmountBefore = new DecimalValueObject(balanceAmountBefore).value;
    this.balanceAmountAfter = new DecimalValueObject(balanceAmountAfter).value;
    this.amount = new DecimalValueObject(amount).value;
  }
  toString() {
    return JSON.stringify({
      accountUuid: this.accountUuid,
      balanceAmountBefore: this.balanceAmountBefore,
      balanceAmountAfter: this.balanceAmountAfter,
      amount: this.amount,
    });
  }
}
