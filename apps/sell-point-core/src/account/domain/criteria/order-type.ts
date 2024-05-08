import { OrderTypes } from './enum-order-types';
import { EnumValueObject } from './enum-value-object';

export class OrderType extends EnumValueObject<OrderTypes> {
  constructor(value: OrderTypes) {
    super(value, Object.values(OrderTypes));
  }

  public static fromValue(value: string): OrderType {
    for (const orderTypeValue of Object.values(OrderTypes)) {
      if (value === orderTypeValue.toString()) {
        return new OrderType(orderTypeValue);
      }
    }

    throw new Error(`The order type ${value} is invalid`);
  }

  public isNone(): boolean {
    return this.value === OrderTypes.NONE;
  }

  public isAsc(): boolean {
    return this.value === OrderTypes.ASC;
  }

  protected throwErrorForInvalidValue(value: OrderTypes): void {
    throw new Error(`The order type ${value} is invalid`);
  }
}
