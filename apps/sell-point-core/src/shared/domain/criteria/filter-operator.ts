import { EOperator } from './enum-operator';
import { EValueObject } from './enum-value-object';

export class FilterOperator extends EValueObject<EOperator> {
  constructor(value: EOperator) {
    super(value, Object.values(EOperator));
  }

  public static fromValue(value: string): FilterOperator {
    for (const operatorValue of Object.values(EOperator)) {
      if (value === operatorValue.toString()) {
        return new FilterOperator(operatorValue);
      }
    }

    throw new Error(`The filter operator ${value} is invalid`);
  }

  public isPositive(): boolean {
    return this.value !== EOperator.NOT_EQUAL && this.value !== EOperator.NOT_CONTAINS;
  }

  protected throwErrorForInvalidValue(value: EOperator): void {
    throw new Error(`The filter operator ${value} is invalid`);
  }

  public static equal() {
    return this.fromValue(EOperator.EQUAL);
  }
}
