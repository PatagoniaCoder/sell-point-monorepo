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
import { BalanceEntity } from '../domain/entity/balance-entity';
import { BalanceService } from './balance.service';
import { BalanceCreateDto, BalanceUpdateDto, FilterBalanceDto } from './dto/balance.dto';

@ApiTags('Balance')
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Post('/filter')
  async filter(@Body() filterBalance: FilterBalanceDto): Promise<BalanceEntity[]> {
    return await this.balanceService.findByCriteria(filterBalance).catch((err) => {
      throw new BadRequestException('Something is wrong', err.message);
    });
  }

  @Get()
  async findAllBalances(): Promise<BalanceEntity[]> {
    return this.balanceService.findAll();
  }

  @Post()
  async createBalance(@Body() transaction: BalanceCreateDto): Promise<BalanceEntity> {
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
