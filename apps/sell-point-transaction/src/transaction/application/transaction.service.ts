import { Inject, Injectable } from '@nestjs/common';
import { Criteria, Filters, Order } from '@sell-point-transaction-share/domain/criteria';
import { EFilter } from '@sell-point-transaction-share/domain/criteria/enum-filter';
import { TransactionTypeRepository } from '@sell-point-transaction-type/domain/repository/transaction-type-repository.interface';
import { EntityTransaction } from '../domain/entity/entity-transaction';
import { TransactionRepository } from '../domain/repository/transaction-repository.interface';
import { TransactionValue } from '../domain/value-object/transaction-value';
import {
  FilterTransactionDto,
  TransactionCreateDto,
  TransactionUpdateDto,
} from './dto/transaction.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('BALANCE_API') private balanceApi: ClientProxy,
    private readonly transactionRepository: TransactionRepository,
    private readonly transactionTypeRepository: TransactionTypeRepository,
  ) {}

  async createTransaction(transaction: TransactionCreateDto): Promise<EntityTransaction> {
    const { transactionTypeUuid, transactionAmount, transactionAccountUuid } = transaction;

    const transactionType =
      await this.transactionTypeRepository.findByUuid(transactionTypeUuid);

    const newTransactionValue = new TransactionValue(
      transactionType,
      transactionAmount,
      transactionAccountUuid,
    );

    const newTransaction =
      await this.transactionRepository.createTransaction(newTransactionValue);
    this.balanceApi.emit('update_balance', {
      amount: newTransaction.transactionAmount,
      accountUuid: newTransaction.transactionAccountUuid,
    });
    return newTransaction;
  }

  async deleteTransaction(uuid: string): Promise<void> {
    await this.transactionRepository.deleteTransaction(uuid).catch((err) => {
      throw new Error(err.message);
    });
  }

  async updateTransaction(
    uuid: string,
    values: TransactionUpdateDto,
  ): Promise<EntityTransaction> {
    return await this.transactionRepository.updateTransaction(uuid, values);
  }

  async findByCriteria(filterTransaction: FilterTransactionDto) {
    const { filters, order, offset, limit } = filterTransaction;
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

    return await this.transactionRepository.findByCriteria(criteria);
  }

  async findAll(): Promise<EntityTransaction[]> {
    return await this.transactionRepository.findAllTransactions();
  }
}
