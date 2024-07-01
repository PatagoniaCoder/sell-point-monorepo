import { Body, Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { EntityAccount } from '../domain/entity/entity-account';
import { AccountService } from './account.service';
import {
  FilterAccountDto,
  AccountCreateMessage,
  AccountUpdateDto,
  BalanceCreatedDto,
  ResponseMessage,
} from './dto/account.dto';
import {
  AccountEventPattern,
  BalanceEventPattern,
} from '@sell-point-account-share/infrastructure/event.pattern';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern(AccountEventPattern.FILTER)
  async filter(@Body() filterAccount: FilterAccountDto): Promise<EntityAccount[]> {
    return await this.accountService.findByCriteria(filterAccount);
  }

  @MessagePattern(AccountEventPattern.FIND_ALL)
  async findAllAccounts(): Promise<EntityAccount[]> {
    return await this.accountService.findAll();
  }

  @MessagePattern(AccountEventPattern.CREATE)
  async createAccountMessage(
    @Payload() payload: AccountCreateMessage,
  ): Promise<ResponseMessage> {
    return await this.accountService.createAccount(payload).catch((err) => {
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
    await this.accountService.balanceCreated(payload);
  }

  @EventPattern(BalanceEventPattern.CREATE_FAIL)
  async balanceCreatedError(payload: BalanceCreatedDto): Promise<void> {
    await this.accountService.balanceCreatedError(payload);
  }
}
