import { Module } from '@nestjs/common';
import { LocalAccountServerController } from './application/local-account-server.controller';
import { LocalAccountServerService } from './application/local-account-server.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CryptographyService } from './application/util/cryptography.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get('AUTH_API_SERVER_URL'),
      }),
    }),
  ],
  controllers: [LocalAccountServerController],
  providers: [LocalAccountServerService, CryptographyService],
})
export class LocalAccountServerModule {}
