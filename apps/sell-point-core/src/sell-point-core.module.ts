import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { BalanceModule } from './balance/balance.module';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionTypeModule } from './transaction-type/transaction-type.module';

@Module({
  imports: [AccountModule, BalanceModule, TransactionModule, TransactionTypeModule],
  controllers: [],
  providers: [],
})
export class SellPointCoreModule {}
