import { BaseEntity } from '@sell-point-account-share/infrastructure/database/mysql/entity/base-entity';
import {
  AccountStatus,
  EntityAccount,
} from '@sell-point-account/domain/entity/entity-account';
import { Column, Entity } from 'typeorm';

@Entity('accounts')
export class AccountEntity extends BaseEntity implements EntityAccount {
  @Column({ type: 'varchar', nullable: false })
  accountNumber: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'enum', enum: AccountStatus })
  status: AccountStatus;
}
