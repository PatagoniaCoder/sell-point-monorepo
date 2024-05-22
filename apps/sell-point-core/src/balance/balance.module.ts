import { Module } from '@nestjs/common';
import { BalanceService } from './application/balance.service';
import { BalanceController } from './application/balance.controller';
import { MysqlRepositoryModule } from './infrastructure/database/mysql/mysql-repository.module';
import { BalanceRepository } from './domain/repository/balance-repository.interface';
import { MysqlService } from './infrastructure/database/mysql/mysql.service';
import { MysqlService as AccountMysqlService } from '../account/infrastructure/database/mysql/mysql.service';
import { AccountRepository } from '../account/domain/repository/account.repository.interface';

@Module({
  imports: [MysqlRepositoryModule],
  providers: [
    BalanceService,
    { provide: BalanceRepository, useClass: MysqlService },
    { provide: AccountRepository, useClass: AccountMysqlService },
  ],
  controllers: [BalanceController],
})
export class BalanceModule {}
