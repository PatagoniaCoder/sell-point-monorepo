import { Filter } from './filter';
import { Filters } from './filters';

describe('Filters', () => {
  it('should be defined', () => {
    const map = new Map([
      ['field', 'uuid'],
      ['operator', '='],
      ['value', 'string'],
    ]);

    const filter = Filter.fromValues(map);
    expect(new Filters([filter])).toBeDefined();
  });

  it('should be return an instance with an array of filters with field "uuid", operator "=" and value "string"', () => {
    const map = new Map([
      ['field', 'uuid'],
      ['operator', '='],
      ['value', 'string'],
    ]);
    const filters = Filters.fromValues([map]);

    expect(filters.filters.length).toBe(1);
    filters.filters.map((filter) => {
      expect(filter.field.value()).toBe('uuid');
      expect(filter.operator.value).toBe('=');
      expect(filter.value.value()).toBe('string');
    });
  });

  it('should return a instance without filters', () => {
    const filters = Filters.none();
    expect(filters.filters.length).toBe(0);
  });
});
