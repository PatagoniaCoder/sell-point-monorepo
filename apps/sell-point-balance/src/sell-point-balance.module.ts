import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceModule } from '@sell-point-balance/balance.module';
import { BalanceEntity } from '@sell-point-balance/infrastructure/database/mysql/entity/balance.entity';
import { SellPointBalanceController } from './sell-point-balance.controller';
import { SellPointBalanceService } from './sell-point-balance.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: Number(configService.get('MYSQL_PORT')),
        database: configService.get('MYSQL_DATABASE_BALANCE_NAME'),
        entities: [BalanceEntity],
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
      }),
    }),
    BalanceModule,
  ],
  controllers: [SellPointBalanceController],
  providers: [SellPointBalanceService],
})
export class SellPointBalanceModule {}
