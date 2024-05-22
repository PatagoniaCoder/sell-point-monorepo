import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entity/transaction-entity';
import { MysqlService } from './mysql.service';
import { TransactionTypeEntity } from 'apps/sell-point-core/src/transaction-type/infrastructure/database/mysql/entity/transaction-type-entity';
import { AccountEntity } from 'apps/sell-point-core/src/account/infrastructure/database/mysql/entity/account-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, TransactionTypeEntity, AccountEntity]),
  ],
  providers: [MysqlService],
  exports: [MysqlService, TypeOrmModule],
})
export class MysqlRepositoryModule {}
