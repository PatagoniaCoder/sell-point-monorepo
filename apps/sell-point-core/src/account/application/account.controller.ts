import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccountService } from './account.service';
import {
  FilterAccountDto,
  AccountDto,
  AccountResponseDto,
  AccountUpdateDto,
} from './dto/account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/filter')
  async filter(@Body() filterAccount: FilterAccountDto): Promise<AccountResponseDto[]> {
    return await this.accountService.findByCriteria(filterAccount).catch((err) => {
      throw new BadRequestException('Something is wrong', err.message);
    });
  }

  @Get()
  async findAllAccounts(): Promise<AccountDto[]> {
    return this.accountService.findAll();
  }

  @Post()
  async createAccount(@Body() account: AccountDto): Promise<AccountDto> {
    return await this.accountService.createAccount(account);
  }

  @Delete(':uuid')
  async deleteAccount(@Param('uuid') uuid: string): Promise<void> {
    return await this.accountService.deleteAccount(uuid).catch((err) => {
      throw new BadRequestException('Something is wrong', err.message);
    });
  }

  @Patch(':uuid')
  async updateAccount(
    @Param('uuid') uuid: string,
    @Body() values: AccountUpdateDto,
  ): Promise<AccountDto> {
    return await this.accountService.updateAccount(uuid, values);
  }
}
