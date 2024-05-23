import { Column, Entity, OneToOne } from 'typeorm';
import { EntityBase } from '../../../../../shared/entity-base';
import { BalanceEntity } from '../../../../../balance/infrastructure/database/mysql/entity/balance-entity';
@Entity('accounts')
export class AccountEntity extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  accountNumber: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @OneToOne(() => BalanceEntity, (balance) => balance.account, { onDelete: 'CASCADE' })
  balance: BalanceEntity;
}
