import { AccountEntity } from '@sell-point-core-account/infrastructure/database/mysql/entity/account.entity';
import { BaseEntity } from '@sell-point-core-share/infrastructure/database/mysql/entity/base.entity';
import { TransactionTypeEntity } from '@sell-point-core-transaction-type/infrastructure/database/mysql/entity/transaction-type.entity';
import { EntityTransaction } from '@sell-point-core-transaction/domain/entity/entity-transaction';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('transaction')
export class TransactionEntity extends BaseEntity implements EntityTransaction {
  @Column({ name: 'transaction_date', type: 'timestamp' })
  transactionDate: Date;

  @ManyToOne(() => TransactionTypeEntity, (transactionType) => transactionType.transactions)
  @JoinColumn({ name: 'transaction_type_id' })
  transactionType: TransactionTypeEntity;

  @ManyToOne(() => AccountEntity, (account) => account.accountTransactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  transactionAccount: AccountEntity;

  @Column({ name: 'transaction_amount' })
  transactionAmount: number;
}
