import { ApiProperty } from '@nestjs/swagger';

export abstract class EntityBase {
  @ApiProperty()
  updateAt?: Date;

  @ApiProperty()
  deleteAt?: Date;
}
