import { EOrderTypes } from './enum-order-types';
import { OrderBy } from './order-by';
import { OrderType } from './order-type';

export class Order {
  readonly orderBy: OrderBy;
  readonly orderType: OrderType;

  constructor(orderBy: OrderBy, orderType: OrderType) {
    this.orderBy = orderBy;
    this.orderType = orderType;
  }

  public static fromValues(orderBy?: string, orderType?: string): Order {
    if (!orderBy) {
      return new Order(new OrderBy(''), new OrderType(EOrderTypes.NONE));
    }

    return new Order(new OrderBy(orderBy), OrderType.fromValue(orderType || EOrderTypes.ASC));
  }

  public hasOrder() {
    return !this.orderType.isNone();
  }
}
