import { v4 as uuid4 } from 'uuid';
import { TransactionEntity } from '../entity/transaction-entity.interface';
import { AccountEntity } from '../../../account/domain/entity/account.entity.interface';
import { TransactionTypeEntity } from '../../../transaction-type/domain/entity/transaction-type-entity.interface';

export class TransactionValue implements TransactionEntity {
  uuid: string;
  transactionDate: Date;
  transactionType: TransactionTypeEntity;
  transactionAccountFrom: AccountEntity;
  transactionAccountTo: AccountEntity;
  transactionAmount: number = 0; // remove when balance is implemented
  transactionAmountBefore: number = 0; // remove when balance is implemented
  transactionAmountAfter: number = 0; // remove when balance is implemented

  constructor(
    transactionType: TransactionTypeEntity,
    transactionAccountFrom: AccountEntity,
    transactionAccountTo: AccountEntity,
    transactionAmount: number,
  ) {
    this.uuid = uuid4();
    this.transactionDate = new Date();
    this.transactionType = transactionType;
    this.transactionAccountFrom = transactionAccountFrom;
    this.transactionAccountTo = transactionAccountTo;
    this.transactionAmount = transactionAmount;
    this.transactionAmountAfter = this.transactionAmountBefore + transactionAmount;
  }
}
