import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { FilterAccountDto, AccountResponseDto } from './dto/account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Post()
  async index(@Body() filterAccount: FilterAccountDto): Promise<AccountResponseDto[]> {
    return await this.accountService.find(filterAccount).catch((err) => {
      throw new BadRequestException('Something is wrong', err.message);
    });
  }
}
