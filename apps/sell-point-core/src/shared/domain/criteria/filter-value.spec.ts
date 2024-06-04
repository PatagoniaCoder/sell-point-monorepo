import { FilterValue } from './filter-value';

describe('FilterValue', () => {
  it('should be defined', () => {
    expect(new FilterValue(null)).toBeDefined();
  });

  it('should be defined with "string" value', () => {
    const value = 'string';
    const filterValue = new FilterValue(value);
    expect(filterValue.value()).toBe(value);
  });
});
