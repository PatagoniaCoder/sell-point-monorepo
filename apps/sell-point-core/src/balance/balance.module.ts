import { Module } from '@nestjs/common';
import { BalanceService } from './application/balance.service';
import { BalanceController } from './application/balance.controller';
import { MysqlRepositoryModule } from './infrastructure/database/mysql/mysql-repository.module';
import { BalanceRepository } from './domain/repository/balance-repository.interface';
import { MysqlService } from './infrastructure/database/mysql/mysql.service';

@Module({
  imports: [MysqlRepositoryModule],
  providers: [BalanceService, { provide: BalanceRepository, useClass: MysqlService }],
  controllers: [BalanceController],
})
export class BalanceModule {}
