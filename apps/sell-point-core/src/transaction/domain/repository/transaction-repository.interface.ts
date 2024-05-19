import { Criteria } from '../criteria';
import { TransactionEntity } from '../entity/transaction-entity.interface';
import { TransactionValue } from '../value-object/transaction-value';

export abstract class TransactionRepository {
  abstract createTransaction(value: TransactionValue): Promise<TransactionEntity>;
  abstract findAllTransactions(): Promise<TransactionEntity[]>;
  abstract findByCriteria(queryParams: Criteria): Promise<TransactionEntity[]>;
  abstract deleteTransaction(uuid: string): Promise<void>;
  abstract updateTransaction(
    uuid: string,
    value: Partial<TransactionValue>,
  ): Promise<TransactionEntity>;
}
