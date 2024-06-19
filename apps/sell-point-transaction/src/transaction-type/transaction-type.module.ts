import { Module } from '@nestjs/common';
import { TransactionTypeController } from './application/transaction-type.controller';
import { TransactionTypeService } from './application/transaction-type.service';
import { TransactionTypeRepository } from './domain/repository/transaction-type.repository';
import { MysqlService } from './infrastructure/database/mysql/mysql.service';
import { MysqlRepositoryModule } from './infrastructure/database/mysql/mysql-repository.module';

@Module({
  imports: [MysqlRepositoryModule],
  controllers: [TransactionTypeController],
  providers: [
    TransactionTypeService,
    { provide: TransactionTypeRepository, useClass: MysqlService },
  ],
})
export class TransactionTypeModule {}
