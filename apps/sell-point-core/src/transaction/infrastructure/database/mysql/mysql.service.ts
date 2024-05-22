import { Injectable } from '@nestjs/common';
import { MySqlCriteriaConverter } from './mysql-criteria-convertor';
import { TransactionRepository } from '../../../domain/repository/transaction-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './entity/transaction-entity';
import { Repository } from 'typeorm';
import { TransactionValue } from '../../../domain/value-object/transaction-value';
import { Criteria } from '../../../domain/criteria';

@Injectable()
export class MysqlService extends MySqlCriteriaConverter implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly mysqlRepository: Repository<TransactionEntity>,
  ) {
    super();
  }

  async createTransaction(value: TransactionValue): Promise<TransactionEntity> {
    const newAccount = this.mysqlRepository.create(value);
    return await this.mysqlRepository.manager.save(newAccount);
  }

  async findAllTransactions(): Promise<TransactionEntity[]> {
    return await this.mysqlRepository.find({ take: 20 });
  }

  async findByCriteria(queryParams: Criteria): Promise<TransactionEntity[]> {
    const { filter, order, limit, skip } = this.convert(queryParams);
    return await this.mysqlRepository.find({
      where: filter.where,
      order: order,
      take: limit,
      skip: skip,
    });
  }

  async deleteTransaction(uuid: string): Promise<void> {
    const entity = await this.mysqlRepository
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
    await this.mysqlRepository.softDelete({ uuid });
  }

  async updateTransaction(
    uuid: string,
    value: Partial<TransactionValue>,
  ): Promise<TransactionEntity> {
    await this.mysqlRepository.update({ uuid }, value);
    return await this.mysqlRepository.findOne({ where: { uuid } });
  }
}
