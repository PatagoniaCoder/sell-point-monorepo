import { ApiProperty } from '@nestjs/swagger';
import { EntityBase } from '@sell-point-transaction-share/domain/entity/entity-base';
import { EntityTransactionType } from '@sell-point-transaction-type/domain/entity/entity-transaction-type';

export abstract class EntityTransaction extends EntityBase {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  transactionDate: Date;

  @ApiProperty()
  transactionType: EntityTransactionType;

  @ApiProperty()
  transactionAmount: number;

  @ApiProperty()
  transactionAccountUuid: string;
}
