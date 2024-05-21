import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Criteria } from '../../../domain/criteria/criteria';
import { AccountRepository } from '../../../domain/repository/account.repository.interface';
import { AccountValue } from '../../../domain/value-object/account.value';
import { AccountEntity } from './entity/account-entity';
import { MySqlCriteriaConverter } from './mysql-criteria-convertor';

@Injectable()
export class MysqlService extends MySqlCriteriaConverter implements AccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly mysqlRepository: Repository<AccountEntity>,
  ) {
    super();
  }

  async createAccount(value: AccountValue): Promise<AccountEntity> {
    const newAccount = this.mysqlRepository.create(value);
    return await this.mysqlRepository.manager.save(newAccount);
  }

  async findAllAccounts(): Promise<AccountEntity[]> {
    return await this.mysqlRepository.find({ take: 20 });
  }

  async findByCriteria(queryParams: Criteria): Promise<AccountEntity[]> {
    const { filter, order, limit, skip } = this.convert(queryParams);
    return await this.mysqlRepository.find({
      where: filter.where,
      order: order,
      take: limit,
      skip: skip,
    });
  }

  async findByUuid(uuid: string): Promise<AccountEntity> {
    return await this.mysqlRepository.findOne({ where: { uuid } });
  }

  async deleteAccount(uuid: string): Promise<void> {
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

  async updateAccount(uuid: string, value: Partial<AccountValue>): Promise<AccountEntity> {
    await this.mysqlRepository.update({ uuid }, value);
    return await this.mysqlRepository.findOne({ where: { uuid } });
  }
}
