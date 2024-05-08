import { OrderTypes } from './enum-order-types';
import { OrderType } from './order-type';

describe('OrderType', () => {
  it('should be defined', () => {
    expect(new OrderType(OrderTypes.ASC)).toBeDefined();
  });
});
