import { EOrderTypes } from './enum-order-types';
import { EValueObject } from './enum-value-object';

export class OrderType extends EValueObject<EOrderTypes> {
  constructor(value: EOrderTypes) {
    super(value, Object.values(EOrderTypes));
  }

  public static fromValue(value: string): OrderType {
    for (const orderTypeValue of Object.values(EOrderTypes)) {
      if (value === orderTypeValue.toString()) {
        return new OrderType(orderTypeValue);
      }
    }

    throw new Error(`The order type ${value} is invalid`);
  }

  public isNone(): boolean {
    return this.value === EOrderTypes.NONE;
  }

  public isAsc(): boolean {
    return this.value === EOrderTypes.ASC;
  }

  protected throwErrorForInvalidValue(value: EOrderTypes): void {
    throw new Error(`The order type ${value} is invalid`);
  }
}
