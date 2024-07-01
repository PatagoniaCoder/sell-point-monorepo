import { Module } from '@nestjs/common';
import { BalanceController } from './application/balance.controller';
import { BalanceService } from './application/balance.service';
import { BalanceRepository } from './domain/repository/balance.repository';
import { MysqlRepositoryModule } from './infrastructure/database/mysql/mysql-repository.module';
import { MysqlService } from './infrastructure/database/mysql/mysql.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'ACCOUNT_SERVICE',
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const broker = configService.get('KAFKA_BROKER');
            const clientID = configService.get('ACCOUNT_ID');
            const consumer = configService.get('ACCOUNT_CONSUMER');
            return {
              transport: Transport.KAFKA,
              options: {
                client: { brokers: [broker], clientId: clientID },
                consumer: {
                  groupId: consumer,
                  retry: {
                    initialRetryTime: 100,
                    retries: 5,
                  },
                },
                subscribe: { fromBeginning: true },
              },
            };
          },
        },
      ],
    }),
    MysqlRepositoryModule,
  ],
  controllers: [BalanceController],
  providers: [BalanceService, { provide: BalanceRepository, useClass: MysqlService }],
})
export class BalanceModule {}
