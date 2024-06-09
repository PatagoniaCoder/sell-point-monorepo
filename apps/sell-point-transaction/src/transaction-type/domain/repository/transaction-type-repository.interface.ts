import { Criteria } from '@sell-point-transaction-share/domain/criteria';
import { EntityTransactionType } from '../entity/entity-transaction-type';
import { TransactionTypeValue } from '../value-object/transaction-type-value';

export abstract class TransactionTypeRepository {
  abstract createTransactionType(value: TransactionTypeValue): Promise<EntityTransactionType>;
  abstract findAllTransactionTypes(): Promise<EntityTransactionType[]>;
  abstract findByCriteria(queryParams: Criteria): Promise<EntityTransactionType[]>;
  abstract findByUuid(uuid: string): Promise<EntityTransactionType>;
  abstract deleteTransactionType(uuid: string): Promise<void>;
  abstract updateTransactionType(
    uuid: string,
    value: Partial<TransactionTypeValue>,
  ): Promise<EntityTransactionType>;
}
