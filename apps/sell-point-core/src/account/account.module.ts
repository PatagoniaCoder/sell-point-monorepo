import { Module } from '@nestjs/common';
import { AccountController } from './application/account.controller';
import { AccountService } from './application/account.service';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
