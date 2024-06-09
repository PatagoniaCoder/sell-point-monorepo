import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AccountRepository } from '../account/domain/repository/account.repository.interface';
import { AccountController } from './application/account.controller';
import { AccountService } from './application/account.service';
import { MysqlRepositoryModule } from './infrastructure/database/mysql/mysql-repository.module';
import { MysqlService } from './infrastructure/database/mysql/mysql.service';

@Module({
  imports: [
    /* ClientsModule.register([
      {
        name: 'BALANCE_API',
        transport: Transport.TCP,
      },
    ]), */
    MysqlRepositoryModule,
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    { provide: AccountRepository, useClass: MysqlService },
    {
      provide: 'BALANCE_API',
      useFactory: () => ClientProxyFactory.create({ transport: Transport.TCP }),
    },
  ],
})
export class AccountModule {}
