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
import { TransactionService } from './transaction.service';
import {
  FilterTransactionDto,
  TransactionCreateDto,
  TransactionUpdateDto,
} from './dto/transaction.dto';
import { TransactionEntity } from '../domain/entity/transaction-entity.interface';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/filter')
  async filter(@Body() filterTransaction: FilterTransactionDto): Promise<TransactionEntity[]> {
    return await this.transactionService.findByCriteria(filterTransaction).catch((err) => {
      throw new BadRequestException('Something is wrong', err.message);
    });
  }

  @Get()
  async findAllTransactions(): Promise<TransactionEntity[]> {
    return this.transactionService.findAll();
  }

  @Post()
  async createTransaction(
    @Body() transaction: TransactionCreateDto,
  ): Promise<TransactionEntity> {
    return await this.transactionService.createTransaction(transaction);
  }

  @Delete(':uuid')
  async deleteTransaction(@Param('uuid') uuid: string): Promise<void> {
    return await this.transactionService.deleteTransaction(uuid).catch((err) => {
      throw new BadRequestException('Something is wrong', err.message);
    });
  }

  @Patch(':uuid')
  async updateTransaction(
    @Param('uuid') uuid: string,
    @Body() values: TransactionUpdateDto,
  ): Promise<TransactionEntity> {
    return await this.transactionService.updateTransaction(uuid, values);
  }
}
