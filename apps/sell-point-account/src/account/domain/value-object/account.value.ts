import { v4 as uuid4 } from 'uuid';
export class AccountValue {
  readonly uuid: string;
  readonly accountNumber: string;
  readonly description: string;
  constructor(accountNumber: string, description: string) {
    this.uuid = uuid4();
    this.accountNumber = accountNumber;
    this.description = description;
  }
}
