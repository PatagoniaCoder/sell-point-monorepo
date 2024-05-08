import { Operator } from './enum-operator';
import { EnumValueObject } from './enum-value-object';

export class FilterOperator extends EnumValueObject<Operator> {
  constructor(value: Operator) {
    super(value, Object.values(Operator));
  }

  public static fromValue(value: string): FilterOperator {
    for (const operatorValue of Object.values(Operator)) {
      if (value === operatorValue.toString()) {
        return new FilterOperator(operatorValue);
      }
    }

    throw new Error(`The filter operator ${value} is invalid`);
  }

  public isPositive(): boolean {
    return this.value !== Operator.NOT_EQUAL && this.value !== Operator.NOT_CONTAINS;
  }

  protected throwErrorForInvalidValue(value: Operator): void {
    throw new Error(`The filter operator ${value} is invalid`);
  }

  public static equal() {
    return this.fromValue(Operator.EQUAL);
  }
}
