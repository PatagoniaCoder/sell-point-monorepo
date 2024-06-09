import { BaseEntity } from '@sell-point-transaction-share/infrastructure/database/mysql/entity/base-entity';
import { TransactionTypeEntity } from '@sell-point-transaction-type/infrastructure/database/mysql/entity/transaction-type.entity';
import { EntityTransaction } from '@sell-point-transaction/domain/entity/entity-transaction';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('transaction')
export class TransactionEntity extends BaseEntity implements EntityTransaction {
  @Column({ name: 'transaction_date', type: 'timestamp' })
  transactionDate: Date;

  @ManyToOne(() => TransactionTypeEntity, (transactionType) => transactionType.transactions)
  @JoinColumn({ name: 'transaction_type_id' })
  transactionType: TransactionTypeEntity;

  @Column({ name: 'transaction_amount' })
  transactionAmount: number;

  @Column({ name: 'transaction_account_uuid' })
  transactionAccountUuid: string;
}
