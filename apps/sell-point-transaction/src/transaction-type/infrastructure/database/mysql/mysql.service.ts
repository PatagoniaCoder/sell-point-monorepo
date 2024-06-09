import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Criteria } from '@sell-point-transaction-share/domain/criteria';
import { MySqlCriteriaConverter } from '@sell-point-transaction-share/infrastructure/database/mysql/mysql-criteria-convertor';
import { TransactionTypeRepository } from '@sell-point-transaction-type/domain/repository/transaction-type-repository.interface';
import { TransactionTypeValue } from '@sell-point-transaction-type/domain/value-object/transaction-type-value';
import { Repository } from 'typeorm';
import { TransactionTypeEntity } from './entity/transaction-type.entity';

@Injectable()
export class MysqlService extends MySqlCriteriaConverter implements TransactionTypeRepository {
  constructor(
    @InjectRepository(TransactionTypeEntity)
    private readonly mysqlRepository: Repository<TransactionTypeEntity>,
  ) {
    super();
  }

  async createTransactionType(value: TransactionTypeValue): Promise<TransactionTypeEntity> {
    const newAccount = this.mysqlRepository.create(value);
    return await this.mysqlRepository.manager.save(newAccount);
  }

  async findAllTransactionTypes(): Promise<TransactionTypeEntity[]> {
    return await this.mysqlRepository.find({ take: 20 });
  }

  async findByCriteria(queryParams: Criteria): Promise<TransactionTypeEntity[]> {
    const { filter, order, limit, skip } = this.convert(queryParams);
    return await this.mysqlRepository.find({
      where: filter.where,
      order: order,
      take: limit,
      skip: skip,
    });
  }

  async findByUuid(uuid: string): Promise<TransactionTypeEntity> {
    return await this.mysqlRepository.findOne({ where: { uuid } });
  }

  async deleteTransactionType(uuid: string): Promise<void> {
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

  async updateTransactionType(
    uuid: string,
    value: Partial<TransactionTypeValue>,
  ): Promise<TransactionTypeEntity> {
    await this.mysqlRepository.update({ uuid }, value);
    return await this.mysqlRepository.findOne({ where: { uuid } });
  }
}
