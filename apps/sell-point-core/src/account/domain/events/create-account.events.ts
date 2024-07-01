import { AccountValue } from '../value-object/account.value';

export class CreateAccountEvent {
  constructor(private value: AccountValue) {}

  toString() {
    return JSON.stringify({
      key: this.value.randomKey,
      value: {
        accountNumber: this.value.accountNumber,
        description: this.value.description,
      },
    });
  }
}
