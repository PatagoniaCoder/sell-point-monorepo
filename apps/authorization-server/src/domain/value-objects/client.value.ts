import { v4 as uuid } from 'uuid';
import { ClientEntity } from '../entities/client.entity';

export class VClient implements ClientEntity {
  redirectUri: string;
  scope: string[];
  uuid: string;

  constructor(entity: ClientEntity) {
    this.uuid = uuid();
    this.redirectUri = entity.redirectUri;
    this.scope = entity.scope;
  }
}
