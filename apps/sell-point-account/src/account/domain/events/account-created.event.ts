export class AccountCreateEvent {
  constructor(public readonly accountId: string) {}

  toString() {
    return JSON.stringify({
      accountUuid: this.accountId,
    });
  }
}
