import { EOrderTypes } from './enum-order-types';
import { OrderType } from './order-type';

describe('OrderType', () => {
  it('should be defined', () => {
    expect(new OrderType(EOrderTypes.ASC)).toBeDefined();
  });

  it('should be defined from value "asc" string', () => {
    const orderType = OrderType.fromValue('asc');
    expect(orderType.value).toBe(EOrderTypes.ASC);
  });

  it('should be defined from value "desc" string', () => {
    const orderType = OrderType.fromValue('desc');
    expect(orderType.value).toBe(EOrderTypes.DESC);
  });

  it('should be defined with NONE value', () => {
    const orderType = OrderType.fromValue('none');
    expect(orderType.value).toBe(EOrderTypes.NONE);
  });

  it('should throw an error for an invalid string value', () => {
    try {
      OrderType.fromValue('');
    } catch (error) {
      expect(error.message).toBe('The order type  is invalid');
    }

    try {
      OrderType.fromValue('any');
    } catch (error) {
      expect(error.message).toBe('The order type any is invalid');
    }
  });

  it('should be check if is ASC', () => {
    const orderType = OrderType.fromValue('asc');
    expect(orderType.isAsc()).toBeTruthy();
  });

  it('should be check if is DESC', () => {
    const orderType = OrderType.fromValue('desc');
    expect(orderType.isAsc()).toBeFalsy();
  });

  it('should be check if is NONE', () => {
    const orderType = OrderType.fromValue('none');
    expect(orderType.isNone()).toBeTruthy();
  });
});
