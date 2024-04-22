import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisRepositoryService } from './redis-repository.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: {
          namespace: 'CODE_VERIFY_DB',
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
        readyLog: true,
        errorLog: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RedisRepositoryService],
  exports: [RedisRepositoryService],
})
export class RedisRepositoryModule {}
