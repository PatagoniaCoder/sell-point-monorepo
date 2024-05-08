import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './dto/account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Post()
  async index(@Body() query: AccountDto) {
    return await this.accountService.find(query);
  }
}
