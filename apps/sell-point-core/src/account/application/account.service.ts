import { Injectable } from '@nestjs/common';

import { Criteria, Filters, Order } from '../domain/criteria';
import { AccountRepository } from '../domain/repository/account.repository.interface';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}
  async find(query: AccountDto) {
    const mapFilters = query.filters.filters.map(
      (filter) =>
        new Map([
          ['field', filter.field.value],
          ['operator', filter.operator.value],
          ['value', filter.value.value],
        ]),
    );
    const criteria = new Criteria(
      Filters.fromValues(mapFilters),
      Order.fromValues(query.order.orderBy.value, query.order.orderType.value),
      query.limit,
      query.offset,
    );

    const result = await this.accountRepository.findByCriteria(criteria);
    return result;
  }
}
