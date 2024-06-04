import { Order } from './order';

describe('Order', () => {
  it('should be defined', () => {
    const orderBy = Order.fromValues('uuid', 'asc');
    expect(orderBy).toBeDefined();
  });

  it('should be defined with order by "uuid" and sort "asc"', () => {
    const orderBy = Order.fromValues('uuid', 'asc');
    expect(orderBy.orderBy.value()).toBe('uuid');
    expect(orderBy.orderType.value).toBe('asc');
  });

  it('should check if have order', () => {
    const orderBy = Order.fromValues('uuid', 'asc');
    expect(orderBy.hasOrder()).toBeTruthy();
  });

  it('should return an instance without sorting', () => {
    const orderBy = Order.fromValues();
    expect(orderBy.hasOrder()).toBeFalsy();
  });
});
