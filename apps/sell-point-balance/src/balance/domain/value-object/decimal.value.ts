export class DecimalValueObject {
  readonly value: number;

  constructor(value: number) {
    this.value = value;
    this.checkValueIsValid(value);
  }

  private checkValueIsValid(value: number): void {
    try {
    } catch (err) {}
    if (this.value > 999999999.9999) {
      this.throwErrorForInvalidValue(value);
    }
  }

  private throwErrorForInvalidValue(value: number): void {
    throw new Error(`The number ${value} is invalid`);
  }
}
