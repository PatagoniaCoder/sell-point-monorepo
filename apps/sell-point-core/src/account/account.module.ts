import { Module } from '@nestjs/common';
import { AccountController } from './application/account.controller';
import { AccountService } from './application/account.service';
import { MysqlRepositoryModule } from './infrastructure/database/mysql/mysql-repository.module';
import { AccountRepository } from '../account/domain/repository/account.repository.interface';
import { MysqlService } from './infrastructure/database/mysql/mysql.service';

@Module({
  imports: [MysqlRepositoryModule],
  controllers: [AccountController],
  providers: [AccountService, { provide: AccountRepository, useClass: MysqlService }],
})
export class AccountModule {}
