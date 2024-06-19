import { Criteria } from '@sell-point-balance-share/domain/criteria';
import { EntityBalance } from '../entity/entity-balance';
import { BalanceValue } from '../value-object/balance.value';

export abstract class BalanceRepository {
  abstract createBalance(value: BalanceValue): Promise<EntityBalance>;
  abstract findAllBalances(): Promise<EntityBalance[]>;
  abstract findAllByCriteria(queryParams: Criteria): Promise<EntityBalance[]>;
  abstract findOneByCriteria(queryParams: Criteria): Promise<EntityBalance>;
  abstract findByUuid(uuid: string): Promise<EntityBalance>;
  abstract deleteBalance(uuid: string): Promise<void>;
  abstract updateBalance(uuid: string, value: Partial<BalanceValue>): Promise<EntityBalance>;
}
