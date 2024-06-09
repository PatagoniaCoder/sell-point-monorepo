import { ApiProperty } from '@nestjs/swagger';
import { EntityBase } from '@sell-point-account-share/domain/entity/entity-base';

export abstract class EntityAccount extends EntityBase {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  accountNumber: string;

  @ApiProperty()
  description: string;
}
