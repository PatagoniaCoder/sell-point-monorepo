import { ArrayContains, Equal, FindOperator, LessThan, MoreThan, Not } from 'typeorm';
import {
  Criteria,
  Filter,
  Filters,
  Operator,
  Order,
  OrderTypes,
} from '../../../domain/criteria/criteria';

interface TransformerFunction<T, K> {
  (value: T): K;
}

type MySqlFilter = {
  where: { [field: string]: FindOperator<string> | FindOperator<string>[] };
};
type MySqlSort = { [field: string]: OrderTypes };
interface MySqlQuery {
  filter: MySqlFilter;
  order: MySqlSort;
  skip: number;
  limit: number;
}
export class MySqlCriteriaConverter {
  private filterTransformers: Map<Operator, TransformerFunction<Filter, MySqlFilter>>;

  constructor() {
    this.filterTransformers = new Map<Operator, TransformerFunction<Filter, MySqlFilter>>([
      [Operator.EQUAL, this.equalFilter],
      [Operator.NOT_EQUAL, this.notEqualFilter],
      [Operator.GT, this.greaterThanFilter],
      [Operator.LT, this.lowerThanFilter],
      [Operator.CONTAINS, this.containsFilter],
      [Operator.NOT_CONTAINS, this.notContainsFilter],
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
      [order.orderBy.value()]: order.orderType.isAsc() ? OrderTypes.ASC : OrderTypes.DESC,
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
    return { where: { [filter.field.value()]: ArrayContains([filter.value.value()]) } };
  }

  private notContainsFilter(filter: Filter): MySqlFilter {
    return { where: { [filter.field.value()]: Not(ArrayContains([filter.value.value()])) } };
  }
}
