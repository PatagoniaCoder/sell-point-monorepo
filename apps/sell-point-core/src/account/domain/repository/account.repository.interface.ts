import { Criteria } from '@sell-point-core-share/domain/criteria';
import { AccountValue } from '../value-object/account.value';
import { EntityAccount } from '../entity/entity-account';

export abstract class AccountRepository {
  abstract createAccount(value: AccountValue): Promise<EntityAccount>;
  abstract findAllAccounts(): Promise<EntityAccount[]>;
  abstract findByCriteria(queryParams: Criteria): Promise<EntityAccount[]>;
  abstract findByUuid(uuid: string): Promise<EntityAccount>;
  abstract deleteAccount(uuid: string): Promise<void>;
  abstract updateAccount(uuid: string, value: Partial<AccountValue>): Promise<EntityAccount>;
}
