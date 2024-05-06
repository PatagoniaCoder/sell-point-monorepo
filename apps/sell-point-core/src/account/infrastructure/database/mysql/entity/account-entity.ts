import { EntityBase } from '../../../../../shared/entity-base';
import { Column, Entity } from 'typeorm';
@Entity('accounts')
export class AccountEntity extends EntityBase {
  @Column({ type: 'uuid', nullable: false })
  uuid: string;

  @Column({ type: 'varchar', nullable: false })
  accountNumber: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;
}
