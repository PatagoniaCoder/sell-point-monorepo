import { Module } from '@nestjs/common';
import { BalanceService } from './application/balance.service';
import { BalanceController } from './application/balance.controller';

@Module({
  providers: [BalanceService],
  controllers: [BalanceController]
})
export class BalanceModule {}
