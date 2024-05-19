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
  TransactionResponseDto,
  TransactionDto,
  TransactionUpdateDto,
} from './dto/transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/filter')
  async filter(
    @Body() filterTransaction: FilterTransactionDto,
  ): Promise<TransactionResponseDto[]> {
    return await this.transactionService.findByCriteria(filterTransaction).catch((err) => {
      throw new BadRequestException('Something is wrong', err.message);
    });
  }

  @Get()
  async findAllTransactions(): Promise<TransactionDto[]> {
    return this.transactionService.findAll();
  }

  @Post()
  async createTransaction(@Body() transaction: TransactionDto): Promise<TransactionDto> {
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
  ): Promise<TransactionDto> {
    return await this.transactionService.updateTransaction(uuid, values);
  }
}
