import { v4 as uuid4 } from 'uuid';
import { EntityTransactionType } from '../entity/entity-transaction-type';

export class TransactionTypeValue implements EntityTransactionType {
  uuid: string;
  description: string;
  action: string;

  constructor(description: string, action: string) {
    this.uuid = uuid4();
    this.description = description;
    this.action = action;
  }
}
