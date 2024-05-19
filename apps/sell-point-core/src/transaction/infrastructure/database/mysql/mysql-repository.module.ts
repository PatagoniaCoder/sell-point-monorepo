import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entity/transaction-entity';
import { MysqlService } from './mysql.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  providers: [MysqlService],
  exports: [MysqlService, TypeOrmModule],
})
export class MysqlRepositoryModule {}
