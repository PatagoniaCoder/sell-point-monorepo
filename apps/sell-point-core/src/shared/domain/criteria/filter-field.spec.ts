import { FilterField } from './filter-field';

describe('FilterField', () => {
  it('should be defined', () => {
    expect(new FilterField(null)).toBeDefined();
  });

  it('should be defined with the "uuid" field', () => {
    const field = new FilterField('uuid');
    expect(field.value()).toBe('uuid');
  });
});
