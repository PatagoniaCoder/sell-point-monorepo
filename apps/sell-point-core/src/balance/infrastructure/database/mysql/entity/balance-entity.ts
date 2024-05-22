import { AccountEntity } from '../../../../../account/infrastructure/database/mysql/entity/account-entity';
import { EntityBase } from '../../../../../shared/entity-base';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('balance')
export class BalanceEntity extends EntityBase {
  @OneToOne(() => AccountEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  account: AccountEntity;

  @Column()
  amount: number;

  @Column({ name: 'last_transaction_uuid', type: 'uuid' })
  lastTransactionUuid: string;
}
