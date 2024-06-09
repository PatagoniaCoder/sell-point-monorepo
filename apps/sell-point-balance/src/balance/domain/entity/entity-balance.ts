import { ApiProperty } from '@nestjs/swagger';
import { EntityBase } from '@sell-point-balance-share/domain/entity/entity-base';

export abstract class EntityBalance extends EntityBase {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  accountUuid: string;

  @ApiProperty()
  balanceAmountBefore: number;

  @ApiProperty()
  balanceAmountAfter: number;

  @ApiProperty()
  amount: number;
}
