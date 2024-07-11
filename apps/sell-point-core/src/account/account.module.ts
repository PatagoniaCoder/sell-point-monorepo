import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountController } from './application/account.controller';
import { AccountService } from './application/account.service';
import { AccountRepository } from './domain/repository/account.repository.interface';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'ACCOUNT_SERVICE',
          useFactory: async (configService: ConfigService) => {
            const broker = configService.get('KAFKA_BROKER');
            const clientID = configService.get('ACCOUNT_ID');
            const consumer = configService.get('ACCOUNT_CONSUMER');
            return {
              transport: Transport.KAFKA,
              options: {
                client: { brokers: [broker], clientId: clientID },
                producer: {
                  allowAutoTopicCreation: true,
                  retry: { retries: 3, initialRetryTime: 100 },
                },
                consumer: { groupId: consumer },
                subscribe: { fromBeginning: true },
              },
            };
          },
          inject: [ConfigService],
        },
      ],
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService, { provide: AccountRepository, useValue: {} }],
})
export class AccountModule {}
