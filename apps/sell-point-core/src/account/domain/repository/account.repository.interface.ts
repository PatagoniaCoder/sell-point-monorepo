import { AccountEntity } from '../../infrastructure/database/mysql/entity/account-entity';
import { Criteria } from '../criteria/criteria';

export interface AccountRepository {
  createAccount(value: AccountEntity): Promise<AccountEntity>;
  findAllAccounts(): Promise<AccountEntity[]>;
  FindByCriteria(queryParams: Criteria): Promise<AccountEntity[]>;
  deleteAccount(uuid: string): Promise<void>;
  updateAccount(uuid: string, value: Partial<AccountEntity>): Promise<AccountEntity>;
}
