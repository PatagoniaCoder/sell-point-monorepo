import { Criteria } from '../criteria';
import { BalanceEntity } from '../entity/balance-entity.interface';
import { BalanceValue } from '../value-object/balance-value';

export abstract class BalanceRepository {
  abstract createBalance(value: BalanceValue): Promise<BalanceEntity>;
  abstract findAllBalances(): Promise<BalanceEntity[]>;
  abstract findByCriteria(queryParams: Criteria): Promise<BalanceEntity[]>;
  abstract findByUuid(uuid: string): Promise<BalanceEntity>;
  abstract deleteBalance(uuid: string): Promise<void>;
  abstract updateBalance(uuid: string, value: Partial<BalanceValue>): Promise<BalanceEntity>;
}
