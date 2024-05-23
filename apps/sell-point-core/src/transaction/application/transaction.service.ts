import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../domain/repository/transaction-repository.interface';
import { Criteria, Filters, Order } from '../domain/criteria';
import {
  FilterTransactionDto,
  TransactionCreateDto,
  TransactionUpdateDto,
} from './dto/transaction.dto';
import { EFilter } from '../domain/criteria/enum-filter';
import { TransactionValue } from '../domain/value-object/transaction-value';
import { TransactionTypeRepository } from '../../transaction-type/domain/repository/transaction-type-repository.interface';
import { AccountRepository } from '../../account/domain/repository/account.repository.interface';
import { TransactionEntity } from '../domain/entity/transaction-entity.interface';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly transactionTypeRepository: TransactionTypeRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  async createTransaction(transaction: TransactionCreateDto): Promise<TransactionEntity> {
    const {
      transactionTypeUuid,
      transactionAccountFromUuid,
      transactionAccountToUuid,
      transactionAmount,
    } = transaction;
    const transactionType =
      await this.transactionTypeRepository.findByUuid(transactionTypeUuid);
    const transactionAccountFrom = await this.accountRepository.findByUuid(
      transactionAccountFromUuid,
    );
    const transactionAccountTo = await this.accountRepository.findByUuid(
      transactionAccountToUuid,
    );
    const newTransaction = new TransactionValue(
      transactionType,
      transactionAccountFrom,
      transactionAccountTo,
      transactionAmount,
    );
    return await this.transactionRepository.createTransaction(newTransaction);
  }

  async deleteTransaction(uuid: string): Promise<void> {
    await this.transactionRepository.deleteTransaction(uuid).catch((err) => {
      throw new Error(err.message);
    });
  }

  async updateTransaction(
    uuid: string,
    values: TransactionUpdateDto,
  ): Promise<TransactionEntity> {
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

  async findAll(): Promise<TransactionEntity[]> {
    return await this.transactionRepository.findAllTransactions();
  }
}
