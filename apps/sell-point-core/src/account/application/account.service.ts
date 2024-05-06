import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../domain/repository/account.repository.interface';
import { Criteria, Filter, Filters } from '../domain/criteria/criteria';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class AccountService {
  // constructor(private readonly accountRepository: AccountRepository) {}
  async find(query: AccountDto) {
    /* query.filters;
    const filters = query.filters.map(({ field, value, operator }) => {
      return new Filter(field, value, operator);
    });

  //  const criteria = new Criteria(new Filters(), query.order, query.limit, query.offset);
    const some = {
      filters: [{ field: 'FilterField', operator: 'FilterOperator', value: 'FilterValue' }],
    };
    this.accountRepository.findByCriteria(criteria); */
  }
}
