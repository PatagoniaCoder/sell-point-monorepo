import { Body, Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  AccountEventPattern,
  BalanceEventPattern,
} from '@sell-point-account-share/infrastructure/event.pattern';
import { EntityAccount } from '../domain/entity/entity-account';
import { AccountService } from './account.service';
import {
  AccountCreateMessage,
  AccountUpdateDto,
  AllAccountsDto,
  BalanceCreatedDto,
  FilterAccountDto,
  ResponseMessage,
} from './dto/account.dto';
import { PageDto } from './dto/page.dto';

@Controller()
export class AccountController {
  logger = new Logger(AccountController.name);
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern(AccountEventPattern.FILTER)
  async filter(@Body() filterAccount: FilterAccountDto): Promise<EntityAccount[]> {
    return await this.accountService.findByCriteria(filterAccount);
  }

  @MessagePattern(AccountEventPattern.FIND_ALL)
  async findAllAccounts(@Payload() q: AllAccountsDto): Promise<PageDto<EntityAccount>> {
    return await this.accountService.findAll(q).catch((err) => {
      this.logger.error(err);
      throw new RpcException(err);
    });
  }

  @MessagePattern(AccountEventPattern.CREATE)
  async createAccountMessage(
    @Payload() payload: AccountCreateMessage,
  ): Promise<ResponseMessage> {
    return await this.accountService.createAccount(payload).catch((err) => {
      this.logger.error(err);
      throw new RpcException(err);
    });
  }

  @MessagePattern(AccountEventPattern.DELETE)
  async deleteAccount(@Payload() uuid: string): Promise<void> {
    return await this.accountService.deleteAccount(uuid);
  }

  @MessagePattern(AccountEventPattern.UPDATE)
  async updateAccount(
    @Payload() uuid: string,
    @Payload() values: AccountUpdateDto,
  ): Promise<EntityAccount> {
    return await this.accountService.updateAccount(uuid, values);
  }

  @EventPattern(BalanceEventPattern.CREATE_SUCCESS)
  async balanceCreated(payload: BalanceCreatedDto): Promise<void> {
    await this.accountService.balanceCreatedSuccess(payload);
  }

  @EventPattern(BalanceEventPattern.CREATE_FAIL)
  async balanceCreatedFails(payload: BalanceCreatedDto): Promise<void> {
    await this.accountService.balanceCreatedFails(payload);
  }
}
