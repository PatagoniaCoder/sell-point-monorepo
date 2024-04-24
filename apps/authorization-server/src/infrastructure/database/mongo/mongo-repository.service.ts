import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientEntity } from '../../../domain/entities/client.entity';
import { ClientRepository } from '../../../domain/repositories/client.repository';
import { ClientModel } from './schema/client.schema';

@Injectable()
export class MongoRepositoryService extends ClientRepository {
  constructor(
    @InjectModel(ClientModel.name) private clientModel: Model<ClientModel>,
  ) {
    super();
  }

  async findClientById(uuid: string): Promise<ClientEntity | null> {
    const client = await this.clientModel.findOne({ uuid });
    if (!client) return null;
    return client;
  }
}
