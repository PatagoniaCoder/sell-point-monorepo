import { Order } from './order';

describe('Order', () => {
  it('should be defined', () => {
    expect(new Order(null, null)).toBeDefined();
  });
});
