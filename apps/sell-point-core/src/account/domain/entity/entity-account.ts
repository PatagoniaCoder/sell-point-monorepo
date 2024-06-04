import { ApiProperty } from '@nestjs/swagger';
import { EntityBase } from '@sell-point-core-share/domain/entity/entity-base';
import { EntityTransaction } from '@sell-point-core-transaction/domain/entity/entity-transaction';

export abstract class EntityAccount extends EntityBase {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  accountNumber: string;

  @ApiProperty()
  description: string;

  accountTransactions: EntityTransaction[];
}
