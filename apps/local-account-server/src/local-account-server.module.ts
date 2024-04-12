import { Module } from '@nestjs/common';
import { LocalAccountServerController } from './local-account-server.controller';
import { LocalAccountServerService } from './local-account-server.service';

@Module({
  imports: [],
  controllers: [LocalAccountServerController],
  providers: [LocalAccountServerService],
})
export class LocalAccountServerModule {}
