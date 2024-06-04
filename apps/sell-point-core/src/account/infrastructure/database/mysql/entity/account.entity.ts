import { EntityAccount } from '@sell-point-core-account/domain/entity/entity-account';
import { BaseEntity } from '@sell-point-core-share/infrastructure/database/mysql/entity/base.entity';
import { TransactionEntity } from '@sell-point-core-transaction/infrastructure/database/mysql/entity/transaction.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('accounts')
export class AccountEntity extends BaseEntity implements EntityAccount {
  @Column({ type: 'varchar', nullable: false })
  accountNumber: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.transactionAccount, {
    onDelete: 'CASCADE',
  })
  accountTransactions: TransactionEntity[];
}
