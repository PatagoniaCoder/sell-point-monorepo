import { Module } from '@nestjs/common';
import { AccountController } from './application/account.controller';
import { AccountService } from './application/account.service';
import { MysqlRepositoryModule } from './infrastructure/database/mysql/mysql-repository.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [MysqlRepositoryModule],
})
export class AccountModule {}
