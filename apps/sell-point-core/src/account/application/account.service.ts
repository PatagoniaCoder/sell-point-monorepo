import { Injectable } from '@nestjs/common';

import { AccountRepository } from '../domain/repository/account.repository.interface';
import { AccountDto } from './dto/account.dto';
import {
  Filter,
  FilterField,
  FilterOperator,
  FilterValue,
  Criteria,
  Filters,
  Order,
  OrderBy,
  OrderType,
} from '../domain/criteria';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}
  async find(query: AccountDto) {
    const allFilter: Filter[] = query.filters.filters.map(
      (filter) =>
        new Filter(
          new FilterField(filter.field.value),
          new FilterOperator(filter.operator.value),
          new FilterValue(filter.value.value),
        ),
    );
    const criteria = new Criteria(
      new Filters(allFilter),
      new Order(
        new OrderBy(query.order.orderBy.value),
        new OrderType(query.order.orderType.value),
      ),
      query.limit,
      query.offset,
    );

    const result = await this.accountRepository.findByCriteria(criteria);
    return result;
  }
}
