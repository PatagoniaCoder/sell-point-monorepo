import {
  Criteria,
  EOperator,
  EOrderTypes,
  Filter,
  Filters,
  Order,
} from '@sell-point-account-share/domain/criteria';
import { Equal, FindOperator, LessThan, Like, MoreThan, Not } from 'typeorm';

interface TransformerFunction<T, K> {
  (value: T): K;
}

type MySqlFilter = {
  where: { [field: string]: FindOperator<string> | FindOperator<string>[] };
};
type MySqlSort = { [field: string]: EOrderTypes };
interface MySqlQuery {
  filter: MySqlFilter;
  order: MySqlSort;
  skip: number;
  limit: number;
}
export class MySqlCriteriaConverter {
  private filterTransformers: Map<EOperator, TransformerFunction<Filter, MySqlFilter>>;

  constructor() {
    this.filterTransformers = new Map<EOperator, TransformerFunction<Filter, MySqlFilter>>([
      [EOperator.EQUAL, this.equalFilter],
      [EOperator.NOT_EQUAL, this.notEqualFilter],
      [EOperator.GT, this.greaterThanFilter],
      [EOperator.LT, this.lowerThanFilter],
      [EOperator.CONTAINS, this.containsFilter],
      [EOperator.NOT_CONTAINS, this.notContainsFilter],
    ]);
  }

  public convert(criteria: Criteria): MySqlQuery {
    return {
      filter: criteria.hasFilters() ? this.generateFilter(criteria.filters) : null,
      order: criteria.order.hasOrder() ? this.generateSort(criteria.order) : null,
      skip: criteria.offset || 0,
      limit: criteria.limit || 0,
    };
  }

  protected generateFilter(filters: Filters): MySqlFilter {
    const filter = filters.filters.map((filter) => {
      const transformer = this.filterTransformers.get(filter.operator.value);

      if (!transformer) {
        throw Error(`Unexpected operator value ${filter.operator.value}`);
      }

      return transformer(filter);
    });

    return Object.assign({}, ...filter);
  }

  protected generateSort(order: Order): MySqlSort {
    return {
      [order.orderBy.value()]: order.orderType.isAsc() ? EOrderTypes.ASC : EOrderTypes.DESC,
    };
  }

  private equalFilter(filter: Filter): MySqlFilter {
    return { where: { [filter.field.value()]: Equal(filter.value.value()) } };
  }

  private notEqualFilter(filter: Filter): MySqlFilter {
    return { where: { [filter.field.value()]: Not(Equal(filter.value.value())) } };
  }

  private greaterThanFilter(filter: Filter): MySqlFilter {
    return { where: { [filter.field.value()]: MoreThan(filter.value.value()) } };
  }

  private lowerThanFilter(filter: Filter): MySqlFilter {
    return { where: { [filter.field.value()]: LessThan(filter.value.value()) } };
  }

  private containsFilter(filter: Filter): MySqlFilter {
    return {
      where: { [filter.field.value()]: Like(`%${filter.value.value()}%`) },
    };
  }

  private notContainsFilter(filter: Filter): MySqlFilter {
    return { where: { [filter.field.value()]: Not(Like(`%${filter.value.value()}%`)) } };
  }
}
