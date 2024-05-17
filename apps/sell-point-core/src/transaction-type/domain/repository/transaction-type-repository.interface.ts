import { Criteria } from '../criteria';
import { TransactionTypeEntity } from '../entity/transaction-type-entity.interface';
import { TransactionTypeValue } from '../value-object/transaction-type-value';

export abstract class TransactionTypeRepository {
  abstract createTransactionType(value: TransactionTypeValue): Promise<TransactionTypeEntity>;
  abstract findAllTransactionTypes(): Promise<TransactionTypeEntity[]>;
  abstract findByCriteria(queryParams: Criteria): Promise<TransactionTypeEntity[]>;
  abstract deleteTransactionType(uuid: string): Promise<void>;
  abstract updateTransactionType(
    uuid: string,
    value: Partial<TransactionTypeValue>,
  ): Promise<TransactionTypeEntity>;
}
