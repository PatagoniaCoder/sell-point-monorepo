import { ClientEntity } from '../entities/client.entity';

export interface ClientRepository {
  findClientById(uuid: string): Promise<ClientEntity | null>;
}
