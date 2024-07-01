import { BaseEntity } from '@sell-point-balance-share/infrastructure/database/mysql/entity/base-entity';
import { EntityBalance } from '@sell-point-balance/domain/entity/entity-balance';
import { Column, ColumnOptions, Entity } from 'typeorm';
const decimalColum: ColumnOptions = {
  type: 'decimal',
  nullable: false,
  precision: 13,
  scale: 4,
  transformer: {
    to(data: number): number {
      return data;
    },
    from(data: string): number {
      return parseFloat(data);
    },
  },
};
@Entity('balances')
export class BalanceEntity extends BaseEntity implements EntityBalance {
  @Column({ type: 'uuid', nullable: false })
  accountUuid: string;

  @Column(decimalColum)
  balanceAmountBefore: number;

  @Column(decimalColum)
  balanceAmountAfter: number;

  @Column(decimalColum)
  amount: number;
}
