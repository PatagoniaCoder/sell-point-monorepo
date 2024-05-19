import { OrderBy } from './order-by';

describe('OrderBy', () => {
  it('should be defined', () => {
    expect(new OrderBy('field')).toBeDefined();
  });

  it('should be defined with value "uuid"', () => {
    const orderBy = new OrderBy('uuid');
    expect(orderBy.value()).toBe('uuid');
  });
});
