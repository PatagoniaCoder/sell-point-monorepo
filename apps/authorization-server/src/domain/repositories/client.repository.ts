import { ClientEntity } from '../entities/client.entity';

export abstract class ClientRepository {
  abstract findClientById(uuid: string): Promise<ClientEntity | null>;
}
