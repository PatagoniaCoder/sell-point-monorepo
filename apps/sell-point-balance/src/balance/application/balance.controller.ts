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
import { EventPattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { EntityBalance } from '../domain/entity/entity-balance';
import { BalanceService } from './balance.service';
import { BalanceCreateDto, BalanceUpdateDto, FilterBalanceDto } from './dto/balance.dto';

@ApiTags('Balance')
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Post('/filter')
  async filter(@Body() filterBalance: FilterBalanceDto): Promise<EntityBalance[]> {
    return await this.balanceService.findAllByCriteria(filterBalance).catch((err) => {
      throw new BadRequestException('Something is wrong', err.message);
    });
  }

  @Get()
  async findAllBalances(): Promise<EntityBalance[]> {
    return await this.balanceService.findAll();
  }

  @Post()
  async createBalance(@Body() balance: BalanceCreateDto): Promise<EntityBalance> {
    return await this.balanceService.createBalance(balance);
  }

  @EventPattern('register_account')
  async createBalanceEvent({ accountId }): Promise<void> {
    const balance = { accountUuid: accountId, amount: 0 };
    await this.balanceService.createBalance(balance);
  }

  @Delete(':uuid')
  async deleteBalance(@Param('uuid') uuid: string): Promise<void> {
    return await this.balanceService.deleteBalance(uuid).catch((err) => {
      throw new BadRequestException('Something is wrong', err.message);
    });
  }

  @Patch(':uuid')
  async updateBalance(
    @Param('uuid') uuid: string,
    @Body() values: BalanceUpdateDto,
  ): Promise<EntityBalance> {
    return await this.balanceService.updateBalance(uuid, values);
  }

  @EventPattern('update_balance')
  async updateBalanceEvent(values: BalanceCreateDto): Promise<void> {
    await this.balanceService.updateBalanceEvent(values);
  }
}
