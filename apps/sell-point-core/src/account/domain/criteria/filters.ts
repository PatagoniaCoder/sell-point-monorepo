import { AccountValue } from '../value-object/account.value';

export abstract class Filters2<T> {
  readonly filters: Partial<T>;
  constructor(filters: Partial<T>) {
    this.filters = filters;
  }

  abstract none(): null;
}
