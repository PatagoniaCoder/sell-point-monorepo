import { Module } from '@nestjs/common';
import { MysqlService } from './mysql.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceEntity } from './entity/balance-entity';
import { AccountEntity } from 'apps/sell-point-core/src/account/infrastructure/database/mysql/entity/account-entity';

@Module({
  imports: [TypeOrmModule.forFeature([BalanceEntity, AccountEntity])],
  providers: [MysqlService],
  exports: [MysqlService, TypeOrmModule],
})
export class MysqlRepositoryModule {}
