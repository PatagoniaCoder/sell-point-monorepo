import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { AccountEntity } from './account/infrastructure/database/mysql/entity/account.entity';
import { SellPointAccountController } from './sell-point-account.controller';
import { SellPointAccountService } from './sell-point-account.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: Number(configService.get('MYSQL_PORT')),
        database: configService.get('MYSQL_DATABASE_ACCOUNT_NAME'),
        entities: [AccountEntity],
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
      }),
    }),
    AccountModule,
  ],
  controllers: [SellPointAccountController],
  providers: [SellPointAccountService],
})
export class SellPointAccountModule {}
