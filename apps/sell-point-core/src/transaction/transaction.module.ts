import { Module } from '@nestjs/common';
import { TransactionService } from './application/transaction.service';
import { TransactionController } from './application/transaction.controller';

@Module({
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
