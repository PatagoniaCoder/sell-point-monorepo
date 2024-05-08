import { Criteria } from './criteria';
import { Filters } from './filters';

describe('Criteria', () => {
  it('should be defined', () => {
    expect(new Criteria(null, null)).toBeDefined();
  });

  it('should have not a filter', () => {
    const filters = new Filters([]);
    const criteria = new Criteria(filters, null);
    expect(criteria.hasFilters()).toBeFalsy();
  });
  it('should have a filter', () => {
    const filters = new Filters(new Array(1));
    const criteria = new Criteria(filters, null);
    expect(criteria.hasFilters()).toBeTruthy();
  });
});
