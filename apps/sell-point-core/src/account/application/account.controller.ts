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
import { ApiTags } from '@nestjs/swagger';
import { EntityAccount } from '../domain/entity/entity-account';
import { AccountService } from './account.service';
import {
  AccountCreateDto,
  AccountUpdateDto,
  FilterAccountDto,
  ResponseMessage,
} from './dto/account.dto';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/filter')
  async filter(@Body() filterAccount: FilterAccountDto): Promise<EntityAccount[]> {
    return await this.accountService.findByCriteria(filterAccount).catch((err) => {
      throw new BadRequestException('Something is wrong', err.message);
    });
  }

  @Get()
  async findAllAccounts(): Promise<EntityAccount[]> {
    return await this.accountService.findAll();
  }

  @Post()
  async createAccount(@Body() account: AccountCreateDto): Promise<ResponseMessage> {
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
  ): Promise<EntityAccount> {
    return await this.accountService.updateAccount(uuid, values);
  }
}
