import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Criteria } from '@sell-point-transaction-share/domain/criteria';
import { MySqlCriteriaConverter } from '@sell-point-transaction-share/infrastructure/database/mysql/mysql-criteria-convertor';
import { EntityTransaction } from '@sell-point-transaction/domain/entity/entity-transaction';
import { TransactionRepository } from '@sell-point-transaction/domain/repository/transaction.repository';
import { TransactionValue } from '@sell-point-transaction/domain/value-object/transaction-value';
import { Repository } from 'typeorm';
import { TransactionEntity } from './entity/transaction.entity';

@Injectable()
export class MysqlService extends MySqlCriteriaConverter implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionMySqlRepository: Repository<TransactionEntity>,
  ) {
    super();
  }

  async createTransaction(value: TransactionValue): Promise<EntityTransaction> {
    const newTransaction = this.transactionMySqlRepository.create(value);
    return await this.transactionMySqlRepository.save(newTransaction);
  }

  async findAllTransactions(): Promise<EntityTransaction[]> {
    return await this.transactionMySqlRepository.find({
      take: 20,
      relations: { transactionType: true },
    });
  }

  async findByCriteria(queryParams: Criteria): Promise<EntityTransaction[]> {
    const { filter, order, limit, skip } = this.convert(queryParams);
    return await this.transactionMySqlRepository.find({
      where: filter.where,
      order: order,
      take: limit,
      skip: skip,
    });
  }

  async deleteTransaction(uuid: string): Promise<void> {
    const entity = await this.transactionMySqlRepository
      .findOneOrFail({
        where: { uuid },
        withDeleted: true,
      })
      .catch(() => {
        throw new Error('Could not find any entity');
      });
    if (entity.deleteAt !== null) {
      throw new Error('Entity has already been deleted');
    }
    await this.transactionMySqlRepository.softDelete({ uuid });
  }

  async updateTransaction(
    uuid: string,
    value: Partial<TransactionValue>,
  ): Promise<EntityTransaction> {
    await this.transactionMySqlRepository.update({ uuid }, value);
    return await this.transactionMySqlRepository.findOne({ where: { uuid } });
  }
}
