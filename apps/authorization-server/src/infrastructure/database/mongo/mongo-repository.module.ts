import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModel, ClientSchema } from './schema/client.schema';
import { MongoRepositoryService } from './mongo-repository.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        pass: 'example',
        user: 'root',
        dbName: configService.get('MONGO_DB_NAME'),
      }),
    }),
    MongooseModule.forFeature([{ name: ClientModel.name, schema: ClientSchema }]),
  ],
  providers: [MongoRepositoryService],
  exports: [MongoRepositoryService, MongooseModule],
})
export class MongoRepositoryModule {}
