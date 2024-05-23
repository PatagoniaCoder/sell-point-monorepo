import { Module } from '@nestjs/common';
import { MysqlService } from './mysql.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entity/account-entity';
import { BalanceEntity } from '../../../../balance/infrastructure/database/mysql/entity/balance-entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, BalanceEntity])],
  providers: [MysqlService],
  exports: [MysqlService, TypeOrmModule],
})
export class MysqlRepositoryModule {}
