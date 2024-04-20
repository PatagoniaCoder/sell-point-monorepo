import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientEntity } from '../../domain/entities/client.entity';
import { ClientRepository } from '../../domain/repositories/client.repository';
import { ClientModel } from './schema/client.schema';

@Injectable()
export class MongoRepositoryService implements ClientRepository {
  constructor(
    @InjectModel(ClientModel.name) private clientModel: Model<ClientModel>,
  ) {}

  async findClientById(uuid: string): Promise<ClientEntity> {
    const client = await this.clientModel.findOne({ uuid });
    return client;
  }
}
