export class AccountValue {
  readonly uuid: string;
  readonly accountNumber: string;
  readonly description: string;
  constructor(uuid: string, accountNumber: string, description: string) {
    this.uuid = uuid;
    this.accountNumber = accountNumber;
    this.description = description;
  }
}
