import { Injectable } from '@nestjs/common';
import { TransactionTypeRepository } from '../domain/repository/transaction-type-repository.interface';
import {
  FilterTransactionTypeDto,
  TransactionTypeDto,
  TransactionTypeUpdateDto,
} from './dto/transaction-type.dto';
import { TransactionTypeValue } from '../domain/value-object/transaction-type-value';
import { Criteria, Filters, Order } from '@sell-point-core-share/domain/criteria';
import { EFilter } from '@sell-point-core-share/domain/criteria/enum-filter';

@Injectable()
export class TransactionTypeService {
  constructor(private readonly transactionTypeRepository: TransactionTypeRepository) {}

  async createTransactionType(
    transactionType: TransactionTypeDto,
  ): Promise<TransactionTypeDto> {
    const { description, action } = transactionType;
    const newTransactionType = new TransactionTypeValue(description, action);
    return await this.transactionTypeRepository.createTransactionType(newTransactionType);
  }

  async deleteTransactionType(uuid: string): Promise<void> {
    await this.transactionTypeRepository.deleteTransactionType(uuid).catch((err) => {
      throw new Error(err.message);
    });
  }

  async updateTransactionType(
    uuid: string,
    values: TransactionTypeUpdateDto,
  ): Promise<TransactionTypeDto> {
    return await this.transactionTypeRepository.updateTransactionType(uuid, values);
  }

  async findByCriteria(filterTransactionType: FilterTransactionTypeDto) {
    const { filters, order, offset, limit } = filterTransactionType;
    const mapFilters = filters.filters.map(
      (filter) =>
        new Map([
          [EFilter.FIELD, filter.field.value],
          [EFilter.OPERATOR, filter.operator.value],
          [EFilter.VALUE, filter.value.value],
        ]),
    );
    const criteria = new Criteria(
      Filters.fromValues(mapFilters),
      Order.fromValues(order.orderBy.value, order.orderType.value),
      limit,
      offset,
    );

    return await this.transactionTypeRepository.findByCriteria(criteria);
  }

  async findAll(): Promise<TransactionTypeDto[]> {
    return await this.transactionTypeRepository.findAllTransactionTypes();
  }
}
