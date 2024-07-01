import { AccountValue } from '../value-object/account.value';

export class BalanceAccountCreateEvent {
  constructor(private value: AccountValue) {}

  toString() {
    return JSON.stringify({
      key: this.value.key,
      value: {
        accountUuid: this.value.uuid,
      },
    });
  }
}
