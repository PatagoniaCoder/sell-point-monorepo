import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Criteria, EFilter, Filters, Order } from '@sell-point-account-share/domain/criteria';
import { BalanceEventPattern } from '@sell-point-account-share/infrastructure/event.pattern';
import { BalanceAccountCreateEvent } from '@sell-point-account/domain/events/balance-account-create.event';
import { AccountStatus, EntityAccount } from '../domain/entity/entity-account';
import { AccountRepository } from '../domain/repository/account.repository';
import { AccountValue } from '../domain/value-object/account.value';
import {
  AccountCreateMessage,
  AccountUpdateDto,
  BalanceCreatedDto,
  FilterAccountDto,
  ResponseMessage,
} from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @Inject('BALANCE_SERVICE') private balanceClient: ClientKafka,
    private readonly accountRepository: AccountRepository,
  ) {}

  async createAccount(payload: AccountCreateMessage): Promise<ResponseMessage> {
    const { key, value } = payload;
    const accountValue = new AccountValue(value.accountNumber, value.description, key);
    await this.accountRepository.createAccount(accountValue);
    this.balanceClient.emit(
      BalanceEventPattern.ACCOUNT_CREATED,
      new BalanceAccountCreateEvent(accountValue).toString(),
    );

    return { key, value: accountValue };
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

  async balanceCreated(payload: BalanceCreatedDto) {
    await this.accountRepository.updateAccount(payload.value.accountUuid, {
      status: AccountStatus.CREATED,
    });
  }

  async balanceCreatedError(payload: BalanceCreatedDto): Promise<void> {
    console.log('leego el id', payload.value.accountUuid);
    await this.accountRepository.updateAccount(payload.value.accountUuid, {
      status: AccountStatus.CANCELED,
    });
  }
}
