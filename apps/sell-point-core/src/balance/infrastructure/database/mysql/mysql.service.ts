import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BalanceValue } from '../../../domain/value-object/balance-value';
import { BalanceRepository } from '../../../domain/repository/balance-repository.interface';
import { MySqlCriteriaConverter } from './mysql-criteria-convertor';
import { BalanceEntity } from './entity/balance-entity';
import { Criteria } from '../../../domain/criteria';

@Injectable()
export class MysqlService extends MySqlCriteriaConverter implements BalanceRepository {
  constructor(
    @InjectRepository(BalanceEntity)
    private readonly mysqlRepository: Repository<BalanceEntity>,
  ) {
    super();
  }

  async createBalance(value: BalanceValue): Promise<BalanceEntity> {
    const newBalance = this.mysqlRepository.create(value);
    return await this.mysqlRepository.manager.save(newBalance);
  }

  async findAllBalances(): Promise<BalanceEntity[]> {
    return await this.mysqlRepository.find({ take: 20 });
  }

  async findByCriteria(queryParams: Criteria): Promise<BalanceEntity[]> {
    const { filter, order, limit, skip } = this.convert(queryParams);
    return await this.mysqlRepository.find({
      where: filter.where,
      order: order,
      take: limit,
      skip: skip,
    });
  }

  async findByUuid(uuid: string): Promise<BalanceEntity> {
    return await this.mysqlRepository.findOne({ where: { uuid } });
  }

  async deleteBalance(uuid: string): Promise<void> {
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

  async updateBalance(uuid: string, value: Partial<BalanceValue>): Promise<BalanceEntity> {
    await this.mysqlRepository.update({ uuid }, value);
    return await this.mysqlRepository.findOne({ where: { uuid } });
  }
}
