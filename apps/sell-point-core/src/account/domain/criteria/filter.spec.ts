import { Filter } from './filter';

describe('Filter', () => {
  it('should be defined', () => {
    expect(new Filter(null, null, null)).toBeDefined();
  });

  it('should be return an instance with field "uuid", operator "=" and value "string"', () => {
    const map = new Map([
      ['field', 'uuid'],
      ['operator', '='],
      ['value', 'string'],
    ]);

    const filter = Filter.fromValues(map);

    expect(filter.field.value()).toBe('uuid');
    expect(filter.operator.value).toBe('=');
    expect(filter.value.value()).toBe('string');
  });

  it('should throw an error on an invalid structure', () => {
    const map = new Map();

    try {
      Filter.fromValues(map);
    } catch (error) {
      expect(error.message).toBe('The filter is invalid');
    }
  });
});
