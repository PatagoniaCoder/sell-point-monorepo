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
import { TransactionTypeService } from './transaction-type.service';
import {
  FilterTransactionTypeDto,
  TransactionTypeDto,
  TransactionTypeResponseDto,
  TransactionTypeUpdateDto,
} from './dto/transaction-type.dto';

@Controller('transaction-type')
export class TransactionTypeController {
  constructor(private readonly transactionTypeService: TransactionTypeService) {}

  @Post('/filter')
  async filter(
    @Body() filterTransactionType: FilterTransactionTypeDto,
  ): Promise<TransactionTypeResponseDto[]> {
    return await this.transactionTypeService
      .findByCriteria(filterTransactionType)
      .catch((err) => {
        throw new BadRequestException('Something is wrong', err.message);
      });
  }

  @Get()
  async findAllTransactionTypes(): Promise<TransactionTypeDto[]> {
    return this.transactionTypeService.findAll();
  }

  @Post()
  async createTransactionType(
    @Body() transactionType: TransactionTypeDto,
  ): Promise<TransactionTypeDto> {
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
  ): Promise<TransactionTypeDto> {
    return await this.transactionTypeService.updateTransactionType(uuid, values);
  }
}
