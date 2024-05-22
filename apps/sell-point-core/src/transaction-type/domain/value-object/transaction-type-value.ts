import { v4 as uuid4 } from 'uuid';
import { TransactionTypeEntity } from '../entity/transaction-type-entity.interface';

export class TransactionTypeValue implements TransactionTypeEntity {
  uuid: string;
  description: string;
  action: string;

  constructor(description: string, action: string) {
    this.uuid = uuid4();
    this.description = description;
    this.action = action;
  }
}
