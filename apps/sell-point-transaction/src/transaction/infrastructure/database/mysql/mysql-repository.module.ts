import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionTypeEntity } from '@sell-point-transaction-type/infrastructure/database/mysql/entity/transaction-type.entity';
import { TransactionEntity } from './entity/transaction.entity';
import { MysqlService } from './mysql.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity, TransactionTypeEntity])],
  providers: [MysqlService],
  exports: [MysqlService, TypeOrmModule],
})
export class MysqlRepositoryModule {}
