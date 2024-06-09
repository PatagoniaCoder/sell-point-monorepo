import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Criteria } from '@sell-point-balance-share/domain/criteria';
import { MySqlCriteriaConverter } from '@sell-point-balance-share/infrastructure/database/mysql/mysql-criteria-convertor';
import { BalanceRepository } from '@sell-point-balance/domain/repository/balance.repository.interface';
import { BalanceValue } from '@sell-point-balance/domain/value-object/balance.value';
import { Repository } from 'typeorm';
import { BalanceEntity } from './entity/balance.entity';
import { EntityBalance } from '@sell-point-balance/domain/entity/entity-balance';

@Injectable()
export class MysqlService extends MySqlCriteriaConverter implements BalanceRepository {
  constructor(
    @InjectRepository(BalanceEntity)
    private readonly balanceRepository: Repository<BalanceEntity>,
  ) {
    super();
  }

  async createBalance(value: BalanceValue): Promise<BalanceEntity> {
    const newBalance = this.balanceRepository.create(value);
    return await this.balanceRepository.save(newBalance);
  }

  async findAllBalances(): Promise<BalanceEntity[]> {
    return await this.balanceRepository.find({ take: 20 });
  }

  async findAllByCriteria(queryParams: Criteria): Promise<BalanceEntity[]> {
    const { filter, order, limit, skip } = this.convert(queryParams);
    return await this.balanceRepository.find({
      where: filter.where,
      order: order,
      take: limit,
      skip: skip,
    });
  }

  async findOneByCriteria(queryParams: Criteria): Promise<EntityBalance> {
    const { filter, order } = this.convert(queryParams);
    return await this.balanceRepository.findOne({
      where: filter.where,
      order: order,
    });
  }

  async findByUuid(uuid: string): Promise<BalanceEntity> {
    return await this.balanceRepository.findOne({ where: { uuid } });
  }

  async deleteBalance(uuid: string): Promise<void> {
    const entity = await this.balanceRepository
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
    await this.balanceRepository.softDelete({ uuid });
  }

  async updateBalance(uuid: string, value: Partial<BalanceValue>): Promise<BalanceEntity> {
    await this.balanceRepository.update({ uuid }, value);
    return await this.balanceRepository.findOne({ where: { uuid } });
  }
}
