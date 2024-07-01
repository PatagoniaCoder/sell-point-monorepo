import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AccountModule],
  controllers: [],
  providers: [],
})
export class SellPointCoreModule {}
