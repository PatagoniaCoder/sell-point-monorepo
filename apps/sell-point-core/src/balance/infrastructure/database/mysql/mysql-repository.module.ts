import { Module } from '@nestjs/common';
import { MysqlService } from './mysql.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceEntity } from './entity/balance-entity';

@Module({
  imports: [TypeOrmModule.forFeature([BalanceEntity])],
  providers: [MysqlService],
  exports: [MysqlService, TypeOrmModule],
})
export class MysqlRepositoryModule {}
