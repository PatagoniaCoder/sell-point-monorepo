import { v4 as uuid4 } from 'uuid';
import { AccountStatus } from '../entity/entity-account';
export class AccountValue {
  readonly uuid: string;
  readonly key: string;
  readonly accountNumber: string;
  readonly description: string;
  readonly status: AccountStatus;

  constructor(accountNumber: string, description: string, key: string) {
    this.uuid = uuid4();
    this.accountNumber = accountNumber;
    this.description = description;
    this.key = key;
    this.status = AccountStatus.PENDING;
  }

  toString() {
    return JSON.stringify({
      key: this.key,
      value: {
        uuid: this.uuid,
        accountNumber: this.accountNumber,
        description: this.description,
        status: this.status,
      },
    });
  }
}
