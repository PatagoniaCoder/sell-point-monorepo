import { Injectable } from '@nestjs/common';
import { EFilter } from '../domain/criteria/enum-filter';
import { Criteria, Filters, Order } from '../domain/criteria';
import { BalanceValue } from '../domain/value-object/balance-value';
import { BalanceDto, BalanceUpdateDto, FilterBalanceDto } from './dto/balance.dto';
import { BalanceRepository } from '../domain/repository/balance-repository.interface';
import { BalanceEntity } from '../domain/entity/balance-entity.interface';

@Injectable()
export class BalanceService {
  constructor(private readonly balanceRepository: BalanceRepository) {}

  async createBalance(balance: BalanceDto): Promise<BalanceEntity> {
    const { accountUuid, amount, lastTransactionUuid } = balance;
    const newBalance = new BalanceValue(accountUuid, amount, lastTransactionUuid);
    return await this.balanceRepository.createBalance(newBalance);
  }

  async deleteBalance(uuid: string): Promise<void> {
    await this.balanceRepository.deleteBalance(uuid).catch((err) => {
      throw new Error(err.message);
    });
  }

  async updateBalance(uuid: string, values: BalanceUpdateDto): Promise<BalanceEntity> {
    return await this.balanceRepository.updateBalance(uuid, values);
  }

  async findByCriteria(filterBalance: FilterBalanceDto) {
    const { filters, order, offset, limit } = filterBalance;
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

    return await this.balanceRepository.findByCriteria(criteria);
  }

  async findAll(): Promise<BalanceEntity[]> {
    return await this.balanceRepository.findAllBalances();
  }
}
