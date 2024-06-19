import { BaseEntity } from '@sell-point-core-share/infrastructure/database/mysql/entity/base.entity';
import { TransactionTypeEntity } from '@sell-point-core-transaction-type/infrastructure/database/mysql/entity/transaction-type.entity';
import { EntityTransaction } from '@sell-point-core-transaction/domain/entity/entity-transaction';
import { EntityAccount } from '@sell-point-core/account/domain/entity/entity-account';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('transaction')
export class TransactionEntity extends BaseEntity implements EntityTransaction {
  @Column({ name: 'transaction_date', type: 'timestamp' })
  transactionDate: Date;

  @ManyToOne(() => TransactionTypeEntity, (transactionType) => transactionType.transactions)
  @JoinColumn({ name: 'transaction_type_id' })
  transactionType: TransactionTypeEntity;

  @ManyToOne(() => EntityAccount, (account) => account.uuid, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  transactionAccount: EntityAccount;

  @Column({ name: 'transaction_amount' })
  transactionAmount: number;
}
