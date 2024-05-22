import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AccountEntity } from '../../../../../account/infrastructure/database/mysql/entity/account-entity';
import { EntityBase } from '../../../../../shared/entity-base';
import { TransactionTypeEntity } from '../../../../../transaction-type/infrastructure/database/mysql/entity/transaction-type-entity';

@Entity('transaction')
export class TransactionEntity extends EntityBase {
  @Column({ name: 'transaction_date', type: 'timestamp' })
  transactionDate: Date;

  @OneToOne(() => TransactionTypeEntity, (tt) => tt.uuid)
  @JoinColumn({ name: 'transaction_type_uuid' })
  transactionType: TransactionTypeEntity;

  @OneToOne(() => AccountEntity, (account) => account.uuid)
  @JoinColumn({ name: 'transaction_account_from_uuid' })
  transactionAccountFrom: AccountEntity;

  @OneToOne(() => AccountEntity, (account) => account.uuid)
  @JoinColumn({ name: 'transaction_account_to_uuid' })
  transactionAccountTo: AccountEntity;

  @Column({ name: 'transaction_amount' })
  transactionAmount: number;

  @Column({ name: 'transaction_amount_before' })
  transactionAmountBefore: number;

  @Column({ name: 'transaction_amount_after' })
  transactionAmountAfter: number;
}
