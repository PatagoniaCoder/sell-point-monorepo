import { Injectable } from '@nestjs/common';
import { Criteria, Filters, Order } from '@sell-point-core-share/domain/criteria';
import { EFilter } from '@sell-point-core-share/domain/criteria/enum-filter';
import { EntityAccount } from '../domain/entity/entity-account';
import { AccountRepository } from '../domain/repository/account.repository.interface';
import { AccountValue } from '../domain/value-object/account.value';
import { AccountCreateDto, AccountUpdateDto, FilterAccountDto } from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async createAccount(account: AccountCreateDto): Promise<EntityAccount> {
    const { accountNumber, description } = account;
    const newAccount = new AccountValue(accountNumber, description);
    return await this.accountRepository.createAccount(newAccount);
  }

  async deleteAccount(uuid: string): Promise<void> {
    await this.accountRepository.deleteAccount(uuid).catch((err) => {
      throw new Error(err.message);
    });
  }

  async updateAccount(uuid: string, values: AccountUpdateDto): Promise<EntityAccount> {
    return await this.accountRepository.updateAccount(uuid, values);
  }

  async findByCriteria(filterAccount: FilterAccountDto): Promise<EntityAccount[]> {
    const { filters, order, offset, limit } = filterAccount;
    const mapFilters = filters.filters.map(
      (filter) =>
        new Map([
          [EFilter.FIELD, filter.field.value],
          [EFilter.OPERATOR, filter.operator.value],
          [EFilter.VALUE, filter.value.value],
        ]),
    );
    const criteria = new Criteria(
      Filters.fromValues(mapFilters),
      Order.fromValues(order.orderBy.value, order.orderType.value),
      limit,
      offset,
    );

    return await this.accountRepository.findByCriteria(criteria);
  }

  async findAll(): Promise<EntityAccount[]> {
    return await this.accountRepository.findAllAccounts();
  }
}
