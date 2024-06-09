import { Module } from '@nestjs/common';
import { BalanceRepository } from '../balance/domain/repository/balance.repository.interface';
import { BalanceController } from './application/balance.controller';
import { BalanceService } from './application/balance.service';
import { MysqlRepositoryModule } from './infrastructure/database/mysql/mysql-repository.module';
import { MysqlService } from './infrastructure/database/mysql/mysql.service';

@Module({
  imports: [MysqlRepositoryModule],
  controllers: [BalanceController],
  providers: [BalanceService, { provide: BalanceRepository, useClass: MysqlService }],
})
export class BalanceModule {}
