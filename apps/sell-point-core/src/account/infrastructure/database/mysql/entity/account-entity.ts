import { Column, Entity } from 'typeorm';
import { EntityBase } from '../../../../../shared/entity-base';
@Entity('accounts')
export class AccountEntity extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  accountNumber: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;
}
