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
import { EntityTransactionType } from '@sell-point-transaction-type/domain/entity/entity-transaction-type';
import {
  FilterTransactionTypeDto,
  TransactionTypeCreateDto,
  TransactionTypeUpdateDto,
} from './dto/transaction-type.dto';
import { TransactionTypeService } from './transaction-type.service';

@Controller('transaction-type')
export class TransactionTypeController {
  constructor(private readonly transactionTypeService: TransactionTypeService) {}

  @Post('/filter')
  async filter(
    @Body() filterTransactionType: FilterTransactionTypeDto,
  ): Promise<TransactionTypeCreateDto[]> {
    return await this.transactionTypeService
      .findByCriteria(filterTransactionType)
      .catch((err) => {
        throw new BadRequestException('Something is wrong', err.message);
      });
  }

  @Get()
  async findAllTransactionTypes(): Promise<EntityTransactionType[]> {
    return this.transactionTypeService.findAll();
  }

  @Post()
  async createTransactionType(
    @Body() transactionType: TransactionTypeCreateDto,
  ): Promise<EntityTransactionType> {
    return await this.transactionTypeService.createTransactionType(transactionType);
  }

  @Delete(':uuid')
  async deleteTransactionType(@Param('uuid') uuid: string): Promise<void> {
    return await this.transactionTypeService.deleteTransactionType(uuid).catch((err) => {
      throw new BadRequestException('Something is wrong', err.message);
    });
  }

  @Patch(':uuid')
  async updateTransactionType(
    @Param('uuid') uuid: string,
    @Body() values: TransactionTypeUpdateDto,
  ): Promise<EntityTransactionType> {
    return await this.transactionTypeService.updateTransactionType(uuid, values);
  }
}
