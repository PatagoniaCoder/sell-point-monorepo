import { Criteria } from '@sell-point-transaction-share/domain/criteria';
import { EntityTransaction } from '../entity/entity-transaction';
import { TransactionValue } from '../value-object/transaction-value';

export abstract class TransactionRepository {
  abstract createTransaction(value: TransactionValue): Promise<EntityTransaction>;
  abstract findAllTransactions(): Promise<EntityTransaction[]>;
  abstract findByCriteria(queryParams: Criteria): Promise<EntityTransaction[]>;
  abstract deleteTransaction(uuid: string): Promise<void>;
  abstract updateTransaction(
    uuid: string,
    value: Partial<TransactionValue>,
  ): Promise<EntityTransaction>;
}
