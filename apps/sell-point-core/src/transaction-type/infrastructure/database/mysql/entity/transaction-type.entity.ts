import { BaseEntity } from '@sell-point-core-share/infrastructure/database/mysql/entity/base.entity';
import { TransactionEntity } from '@sell-point-core-transaction/infrastructure/database/mysql/entity/transaction.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('transaction_type_entity')
export class TransactionTypeEntity extends BaseEntity {
  @Column()
  description: string;

  @Column()
  action: string;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.transactionType)
  transactions: TransactionEntity[];
}
