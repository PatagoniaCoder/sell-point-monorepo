import { ApiProperty } from '@nestjs/swagger';
import { EntityBase } from '@sell-point-core-share/domain/entity/entity-base';

export abstract class EntityTransactionType extends EntityBase {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  action: string;
}