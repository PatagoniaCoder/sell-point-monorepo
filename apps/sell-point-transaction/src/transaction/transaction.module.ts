import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TransactionTypeRepository } from '../transaction-type/domain/repository/transaction-type.repository';
import { MysqlService as MysqlServiceTransactionType } from '../transaction-type/infrastructure/database/mysql/mysql.service';
import { TransactionController } from './application/transaction.controller';
import { TransactionService } from './application/transaction.service';
import { TransactionRepository } from './domain/repository/transaction.repository';
import { MysqlRepositoryModule } from './infrastructure/database/mysql/mysql-repository.module';
import { MysqlService } from './infrastructure/database/mysql/mysql.service';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'BALANCE_SERVICE',
          useFactory: (configService: ConfigService) => {
            const broker = configService.get('KAFKA_BROKER');
            const clientID = configService.get('BALANCE_ID');
            const consumer = configService.get('BALANCE_CONSUMER');
            return {
              transport: Transport.KAFKA,
              options: {
                client: { brokers: [broker], clientId: clientID },
                consumer: {
                  groupId: consumer,
                },
              },
            };
          },
          inject: [ConfigService],
        },
      ],
    }),
    MysqlRepositoryModule,
  ],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    { provide: TransactionRepository, useClass: MysqlService },
    { provide: TransactionTypeRepository, useClass: MysqlServiceTransactionType },
  ],
})
export class TransactionModule {}
