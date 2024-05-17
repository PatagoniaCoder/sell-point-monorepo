import { Module } from '@nestjs/common';
import { MysqlService } from './mysql.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionTypeEntity } from './entity/transaction-type-entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionTypeEntity])],
  providers: [MysqlService],
  exports: [MysqlService, TypeOrmModule],
})
export class MysqlRepositoryModule {}
