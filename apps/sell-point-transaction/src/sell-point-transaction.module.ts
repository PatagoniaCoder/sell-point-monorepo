import { Module } from '@nestjs/common';
import { SellPointTransactionController } from './sell-point-transaction.controller';
import { SellPointTransactionService } from './sell-point-transaction.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionTypeEntity } from './transaction-type/infrastructure/database/mysql/entity/transaction-type.entity';
import { TransactionEntity } from './transaction/infrastructure/database/mysql/entity/transaction.entity';
import { TransactionModule } from '@sell-point-transaction/transaction.module';
import { TransactionTypeModule } from '@sell-point-transaction-type/transaction-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: Number(configService.get('MYSQL_PORT')),
        database: configService.get('MYSQL_DATABASE_TRANSACTION_NAME'),
        entities: [TransactionTypeEntity, TransactionEntity],
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
      }),
    }),
    TransactionModule,
    TransactionTypeModule,
  ],
  controllers: [SellPointTransactionController],
  providers: [SellPointTransactionService],
})
export class SellPointTransactionModule {}
