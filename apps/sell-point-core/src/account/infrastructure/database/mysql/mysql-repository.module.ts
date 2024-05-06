import { Module } from '@nestjs/common';
import { MysqlService } from './mysql.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entity/account-entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [MysqlService],
})
export class MysqlRepositoryModule {}
