import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entity/transaction.entity';
import { MysqlService } from './mysql.service';
import { TransactionTypeEntity } from '../../../../transaction-type/infrastructure/database/mysql/entity/transaction-type.entity';
import { EntityAccount } from '@sell-point-account/domain/entity/entity-account';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, TransactionTypeEntity, EntityAccount]),
  ],
  providers: [MysqlService],
  exports: [MysqlService, TypeOrmModule],
})
export class MysqlRepositoryModule {}
