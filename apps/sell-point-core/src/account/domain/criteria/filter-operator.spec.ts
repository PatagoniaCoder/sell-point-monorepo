import { Operator } from './enum-operator';
import { FilterOperator } from './filter-operator';

describe('FilterOperator', () => {
  it('should be defined', () => {
    expect(new FilterOperator(Operator.EQUAL)).toBeDefined();
  });
});
