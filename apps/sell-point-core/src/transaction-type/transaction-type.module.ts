import { Module } from '@nestjs/common';
import { TransactionTypeController } from './application/transaction-type.controller';
import { TransactionTypeService } from './application/transaction-type.service';

@Module({
  controllers: [TransactionTypeController],
  providers: [TransactionTypeService]
})
export class TransactionTypeModule {}
