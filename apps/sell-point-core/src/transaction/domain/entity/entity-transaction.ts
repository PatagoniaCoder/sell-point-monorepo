import { ApiProperty } from '@nestjs/swagger';
import { EntityAccount } from '@sell-point-core-account/domain/entity/entity-account';
import { EntityBase } from '@sell-point-core-share/domain/entity/entity-base';
import { EntityTransactionType } from '@sell-point-core-transaction-type/domain/entity/entity-transaction-type';

export abstract class EntityTransaction extends EntityBase {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  transactionDate: Date;

  @ApiProperty()
  transactionType: EntityTransactionType;

  @ApiProperty()
  transactionAccount: EntityAccount;

  @ApiProperty()
  transactionAmount: number;
}
