import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { TransactionTypeModule } from './transaction-type/transaction-type.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AccountModule,
    TransactionModule,
    TransactionTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class SellPointCoreModule {}
