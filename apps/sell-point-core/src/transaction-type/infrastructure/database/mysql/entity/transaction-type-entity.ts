import { EntityBase } from '../../../../../shared/entity-base';
import { Column, Entity } from 'typeorm';

@Entity('transaction_type_entity')
export class TransactionTypeEntity extends EntityBase {
  @Column()
  description: string;

  @Column()
  action: string;
}
