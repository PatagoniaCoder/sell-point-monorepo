import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationServerController } from './application/authorization-server.controller';
import { AuthorizationServerService } from './application/authorization-server.service';
import { MongoRepositoryModule } from './infrastructure/database/mongo/mongo-repository.module';
import { MongoRepositoryService } from './infrastructure/database/mongo/mongo-repository.service';
import { RedisRepositoryService } from './infrastructure/database/redis/redis-repository.service';
import { RedisRepositoryModule } from './infrastructure/database/redis/redis-repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoRepositoryModule,
    RedisRepositoryModule,
  ],
  controllers: [AuthorizationServerController],
  providers: [
    { provide: 'CLIENT_REPOSITORY', useClass: MongoRepositoryService },
    {
      provide: 'VERIFICATION_CODE_REPOSITORY',
      useClass: RedisRepositoryService,
    },
    AuthorizationServerService,
  ],
})
export class AppModule {}
