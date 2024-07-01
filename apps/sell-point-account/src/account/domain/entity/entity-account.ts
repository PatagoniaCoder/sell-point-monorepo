import { ApiProperty } from '@nestjs/swagger';
import { EntityBase } from '@sell-point-account-share/domain/entity/entity-base';

export enum AccountStatus {
  PENDING = 'PENDING',
  CREATED = 'CREATED',
  CANCELED = 'CANCELED',
}
export abstract class EntityAccount extends EntityBase {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  accountNumber: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  status: AccountStatus;
}
