import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { BalanceModule } from './balance/balance.module';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionTypeModule } from './transaction-type/transaction-type.module';
import { AccountEntity } from './account/infrastructure/database/mysql/entity/account-entity';
import { TransactionTypeEntity } from './transaction-type/infrastructure/database/mysql/entity/transaction-type-entity';
import { TransactionEntity } from './transaction/infrastructure/database/mysql/entity/transaction-entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: Number(configService.get('MYSQL_PORT')),
        database: configService.get('MYSQL_DATABASE_NAME'),
        entities: [AccountEntity, TransactionTypeEntity, TransactionEntity],
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
      }),
    }),
    AccountModule,
    BalanceModule,
    TransactionModule,
    TransactionTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class SellPointCoreModule {}
