import { AccountEntity } from '../../infrastructure/database/mysql/entity/account-entity';
import { Criteria } from '../criteria/criteria';
import { AccountValue } from '../value-object/account.value';

export abstract class AccountRepository {
  abstract createAccount(value: AccountValue): Promise<AccountEntity>;
  abstract findAllAccounts(): Promise<AccountEntity[]>;
  abstract findByCriteria(queryParams: Criteria): Promise<AccountEntity[]>;
  abstract findByUuid(uuid: string): Promise<AccountEntity>;
  abstract deleteAccount(uuid: string): Promise<void>;
  abstract updateAccount(uuid: string, value: Partial<AccountValue>): Promise<AccountEntity>;
}
