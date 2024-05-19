import { Module } from '@nestjs/common';
import { TransactionService } from './application/transaction.service';
import { TransactionController } from './application/transaction.controller';
import { MysqlRepositoryModule } from './infrastructure/database/mysql/mysql-repository.module';
import { TransactionRepository } from './domain/repository/transaction-repository.interface';
import { MysqlService } from './infrastructure/database/mysql/mysql.service';

@Module({
  imports: [MysqlRepositoryModule],
  controllers: [TransactionController],

  providers: [TransactionService, { provide: TransactionRepository, useClass: MysqlService }],
})
export class TransactionModule {}
