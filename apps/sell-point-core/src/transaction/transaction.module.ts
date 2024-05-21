import { Module } from '@nestjs/common';
import { TransactionService } from './application/transaction.service';
import { TransactionController } from './application/transaction.controller';
import { MysqlRepositoryModule } from './infrastructure/database/mysql/mysql-repository.module';
import { TransactionRepository } from './domain/repository/transaction-repository.interface';
import { MysqlService } from './infrastructure/database/mysql/mysql.service';
import { MysqlService as MysqlServiceAccount } from '../account/infrastructure/database/mysql/mysql.service';
import { MysqlService as MysqlServiceTransactionType } from '../transaction-type/infrastructure/database/mysql/mysql.service';
import { TransactionTypeRepository } from '../transaction-type/domain/repository/transaction-type-repository.interface';
import { AccountRepository } from '../account/domain/repository/account.repository.interface';

@Module({
  imports: [MysqlRepositoryModule],
  controllers: [TransactionController],

  providers: [
    TransactionService,
    { provide: TransactionRepository, useClass: MysqlService },
    { provide: TransactionTypeRepository, useClass: MysqlServiceTransactionType },
    { provide: AccountRepository, useClass: MysqlServiceAccount },
  ],
})
export class TransactionModule {}
