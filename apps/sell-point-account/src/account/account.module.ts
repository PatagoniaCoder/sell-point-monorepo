import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountController } from './application/account.controller';
import { AccountService } from './application/account.service';
import { AccountRepository } from './domain/repository/account.repository';
import { MysqlRepositoryModule } from './infrastructure/database/mysql/mysql-repository.module';
import { MysqlService } from './infrastructure/database/mysql/mysql.service';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'BALANCE_SERVICE',
          useFactory: async (configService: ConfigService) => {
            const broker = configService.get('KAFKA_BROKER');
            const clientID = configService.get('BALANCE_ID');
            return {
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: clientID,
                  brokers: [broker],
                },

                producer: { allowAutoTopicCreation: true },
                subscribe: { fromBeginning: true },
              },
            };
          },
          inject: [ConfigService],
        },
      ],
    }),
    MysqlRepositoryModule,
  ],
  controllers: [AccountController],
  providers: [AccountService, { provide: AccountRepository, useClass: MysqlService }],
})
export class AccountModule {}
