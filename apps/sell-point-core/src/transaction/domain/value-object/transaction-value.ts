import { EntityAccount } from '@sell-point-core-account/domain/entity/entity-account';
import { EntityTransactionType } from '@sell-point-core-transaction-type/domain/entity/entity-transaction-type';
import { v4 as uuid4 } from 'uuid';
import { EntityTransaction } from '../entity/entity-transaction';

export class TransactionValue implements EntityTransaction {
  uuid: string;
  transactionDate: Date;
  transactionType: EntityTransactionType;
  transactionAmount: number;
  transactionAccount: EntityAccount;

  constructor(
    transactionType: EntityTransactionType,
    transactionAmount: number,
    transactionAccount: EntityAccount,
  ) {
    this.uuid = uuid4();
    this.transactionDate = new Date();
    this.transactionType = transactionType;
    this.transactionAmount = transactionAmount;
    this.transactionAccount = transactionAccount;
  }
}
