import { Injectable } from '@nestjs/common';
import { Criteria, Filters, Order } from '@sell-point-balance-share/domain/criteria';
import { EFilter } from '@sell-point-balance-share/domain/criteria/enum-filter';
import { EntityBalance } from '../domain/entity/entity-balance';
import { BalanceRepository } from '../domain/repository/balance.repository.interface';
import { BalanceValue } from '../domain/value-object/balance.value';
import { BalanceCreateDto, BalanceUpdateDto, FilterBalanceDto } from './dto/balance.dto';

@Injectable()
export class BalanceService {
  constructor(private readonly balanceRepository: BalanceRepository) {}

  async createBalance(updateBalance: BalanceCreateDto): Promise<EntityBalance> {
    const { accountUuid, amount } = updateBalance;
    const newBalance = new BalanceValue(accountUuid, 0, amount, amount);
    return await this.balanceRepository.createBalance(newBalance);
  }

  async deleteBalance(uuid: string): Promise<void> {
    await this.balanceRepository.deleteBalance(uuid).catch((err) => {
      throw new Error(err.message);
    });
  }

  async updateBalance(uuid: string, values: BalanceUpdateDto): Promise<EntityBalance> {
    const { accountUuid, amount } = values;
    const balance = await this.balanceRepository.findByUuid(uuid);
    const balanceAmountBefore = balance.amount;
    const balanceAmountAfter = balance.balanceAmountAfter;
    const updatedBalance = {
      accountUuid,
      balanceAmountBefore,
      balanceAmountAfter: balanceAmountAfter + amount,
      amount: balanceAmountAfter + amount,
    };
    return await this.balanceRepository.updateBalance(uuid, updatedBalance);
  }

  async findAllByCriteria(filterBalance: FilterBalanceDto): Promise<EntityBalance[]> {
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
      Order.fromValues(order.orderBy?.value, order.orderType?.value),
      limit,
      offset,
    );

    return await this.balanceRepository.findAllByCriteria(criteria);
  }

  async findAll(): Promise<EntityBalance[]> {
    return await this.balanceRepository.findAllBalances();
  }

  async updateBalanceEvent(values: BalanceCreateDto): Promise<void> {
    const criteria = new Criteria(
      Filters.fromValues([
        new Map([
          [EFilter.FIELD, 'accountUuid'],
          [EFilter.OPERATOR, '='],
          [EFilter.VALUE, values.accountUuid],
        ]),
      ]),
      Order.fromValues(),
    );
    const balance = await this.balanceRepository.findOneByCriteria(criteria);
    await this.updateBalance(balance.uuid, values);
  }
}
