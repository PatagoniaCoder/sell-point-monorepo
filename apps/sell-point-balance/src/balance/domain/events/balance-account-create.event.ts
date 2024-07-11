export class BalanceAccountCreateEvent {
  constructor(
    private key: string,
    private accountUuid: string,
  ) {}

  toString() {
    return JSON.stringify({
      key: this.key,
      value: {
        accountUuid: this.accountUuid,
      },
    });
  }
}
