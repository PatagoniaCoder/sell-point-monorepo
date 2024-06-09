import { Injectable } from '@nestjs/common';
import { Criteria, Filters, Order } from '@sell-point-transaction-share/domain/criteria';
import { EFilter } from '@sell-point-transaction-share/domain/criteria/enum-filter';
import { EntityTransactionType } from '@sell-point-transaction-type/domain/entity/entity-transaction-type';
import { TransactionTypeRepository } from '../domain/repository/transaction-type-repository.interface';
import { TransactionTypeValue } from '../domain/value-object/transaction-type-value';
import {
  FilterTransactionTypeDto,
  TransactionTypeCreateDto,
  TransactionTypeUpdateDto,
} from './dto/transaction-type.dto';

@Injectable()
export class TransactionTypeService {
  constructor(private readonly transactionTypeRepository: TransactionTypeRepository) {}

  async createTransactionType(
    transactionType: TransactionTypeCreateDto,
  ): Promise<EntityTransactionType> {
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
  ): Promise<EntityTransactionType> {
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

  async findAll(): Promise<EntityTransactionType[]> {
    return await this.transactionTypeRepository.findAllTransactionTypes();
  }
}
