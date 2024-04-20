import { Module } from '@nestjs/common';
import { AuthorizationServerController } from './application/authorization-server.controller';
import { AuthorizationServerService } from './application/authorization-server.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ClientModel,
  ClientSchema,
} from './infrastructure/database/schema/client.schema';
import { MongoRepositoryService } from './infrastructure/database/mongo-repository.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        pass: 'example',
        user: 'root',
        dbName: configService.get('MONGO_DB_NAME'),
      }),
    }),
    MongooseModule.forFeature([
      { name: ClientModel.name, schema: ClientSchema },
    ]),
  ],
  controllers: [AuthorizationServerController],
  providers: [
    { provide: 'CLIENT_REPOSITORY', useClass: MongoRepositoryService },
    AuthorizationServerService,
  ],
})
export class AppModule {}
