import { Module } from '@nestjs/common';
import { LocalAccountServerController } from './application/local-account-server.controller';
import { LocalAccountServerService } from './application/local-account-server.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [LocalAccountServerController],
  providers: [LocalAccountServerService],
})
export class LocalAccountServerModule {}
