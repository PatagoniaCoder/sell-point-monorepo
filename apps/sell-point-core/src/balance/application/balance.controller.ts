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
import { BalanceService } from './balance.service';
import {
  BalanceDto,
  BalanceResponseDto,
  BalanceUpdateDto,
  FilterBalanceDto,
} from './dto/balance.dto';
import { BalanceEntity } from '../domain/entity/balance-entity.interface';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Post('/filter')
  async filter(@Body() filterBalance: FilterBalanceDto): Promise<BalanceResponseDto[]> {
    return await this.balanceService.findByCriteria(filterBalance).catch((err) => {
      throw new BadRequestException('Something is wrong', err.message);
    });
  }

  @Get()
  async findAllBalances(): Promise<BalanceEntity[]> {
    return this.balanceService.findAll();
  }

  @Post()
  async createBalance(@Body() transaction: BalanceDto): Promise<BalanceEntity> {
    return await this.balanceService.createBalance(transaction);
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
  ): Promise<BalanceEntity> {
    return await this.balanceService.updateBalance(uuid, values);
  }
}
