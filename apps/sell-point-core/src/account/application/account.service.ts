import { Injectable } from '@nestjs/common';
import { Criteria, Filters, Order } from '../domain/criteria';
import { EFilter } from '../domain/criteria/enum-filter';
import { AccountRepository } from '../domain/repository/account.repository.interface';
import { AccountValue } from '../domain/value-object/account.value';
import { AccountDto, AccountUpdateDto, FilterAccountDto } from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async createAccount(account: AccountDto): Promise<AccountDto> {
    const { accountNumber, description } = account;
    const newAccount = new AccountValue(accountNumber, description);
    return await this.accountRepository.createAccount(newAccount);
  }

  async deleteAccount(uuid: string): Promise<void> {
    await this.accountRepository.deleteAccount(uuid).catch((err) => {
      throw new Error(err.message);
    });
  }

  async updateAccount(uuid: string, values: AccountUpdateDto): Promise<AccountDto> {
    return await this.accountRepository.updateAccount(uuid, values);
  }

  async findByCriteria(filterAccount: FilterAccountDto) {
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

  async findAll(): Promise<AccountDto[]> {
    return await this.accountRepository.findAllAccounts();
  }
}
