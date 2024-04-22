import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthorizationServerController } from './application/authorization-server.controller';
import { AuthorizationServerService } from './application/authorization-server.service';
import { MongoRepositoryModule } from './infrastructure/database/mongo/mongo-repository.module';
import { MongoRepositoryService } from './infrastructure/database/mongo/mongo-repository.service';
import { RedisRepositoryService } from './infrastructure/database/redis/redis-repository.service';
import { RedisRepositoryModule } from './infrastructure/database/redis/redis-repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_TOKEN_EXPIRES') },
      }),
      inject: [ConfigService],
    }),
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
