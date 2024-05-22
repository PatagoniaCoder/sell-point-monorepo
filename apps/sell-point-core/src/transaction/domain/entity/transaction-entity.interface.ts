import { AccountEntity } from '../../../account/domain/entity/account.entity.interface';
import { TransactionTypeEntity } from '../../../transaction-type/domain/entity/transaction-type-entity.interface';

export abstract class TransactionEntity {
  uuid: string;
  transactionDate: Date;
  transactionType: TransactionTypeEntity;
  transactionAccountFrom: AccountEntity;
  transactionAccountTo: AccountEntity;
  transactionAmount: number;
  transactionAmountBefore: number;
  transactionAmountAfter: number;
}
