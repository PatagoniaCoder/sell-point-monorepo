import { AccountEntity } from '../../infrastructure/database/mysql/entity/account-entity';
import { Criteria } from '../criteria/criteria';

export abstract class AccountRepository {
  abstract createAccount(value: AccountEntity): Promise<AccountEntity>;
  abstract findAllAccounts(): Promise<AccountEntity[]>;
  abstract findByCriteria(queryParams: Criteria): Promise<AccountEntity[]>;
  abstract deleteAccount(uuid: string): Promise<void>;
  abstract updateAccount(uuid: string, value: Partial<AccountEntity>): Promise<AccountEntity>;
}
