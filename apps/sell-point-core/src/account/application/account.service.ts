import { Injectable } from '@nestjs/common';

import { Criteria, Filters, Order } from '../domain/criteria';
import { AccountRepository } from '../domain/repository/account.repository.interface';
import { FilterAccountDto } from './dto/account.dto';
import { EFilter } from '../domain/criteria/enum-filter';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}
  async find(filterAccount: FilterAccountDto) {
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
}
