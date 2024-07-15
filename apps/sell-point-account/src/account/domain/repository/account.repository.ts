import { Criteria } from '@sell-point-account-share/domain/criteria';
import { PageDto } from '@sell-point-account/application/dto/page.dto';
import { EntityAccount } from '../entity/entity-account';
import { AccountValue } from '../value-object/account.value';

export abstract class AccountRepository {
  abstract createAccount(value: AccountValue): Promise<EntityAccount>;
  abstract findAllAccounts(q: Criteria): Promise<PageDto<EntityAccount>>;
  abstract findByCriteria(queryParams: Criteria): Promise<EntityAccount[]>;
  abstract findByUuid(uuid: string): Promise<EntityAccount>;
  abstract deleteAccount(uuid: string): Promise<void>;
  abstract updateAccount(uuid: string, value: Partial<AccountValue>): Promise<EntityAccount>;
}
