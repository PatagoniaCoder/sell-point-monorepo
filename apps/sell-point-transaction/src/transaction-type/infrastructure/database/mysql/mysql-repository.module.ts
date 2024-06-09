import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionTypeEntity } from './entity/transaction-type.entity';
import { MysqlService } from './mysql.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionTypeEntity])],
  providers: [MysqlService],
  exports: [MysqlService, TypeOrmModule],
})
export class MysqlRepositoryModule {}
