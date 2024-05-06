import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Criteria } from '../../../domain/criteria/criteria';
import { AccountRepository } from '../../../domain/repository/account.repository.interface';
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

  async createAccount(value: AccountEntity): Promise<AccountEntity> {
    throw new Error('Method not implemented.');
  }

  async findAllAccounts(): Promise<AccountEntity[]> {
    return await this.mysqlRepository.find({ take: 20 });
  }

  async findByCriteria(queryParams: Criteria): Promise<AccountEntity[]> {
    const fil = this.convert(queryParams);

    return await this.mysqlRepository.find({
      where: fil.filter.where,
      order: fil.order,
      take: fil.limit,
      skip: fil.skip,
    });
  }

  async deleteAccount(uuid: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async updateAccount(uuid: string, value: Partial<AccountEntity>): Promise<AccountEntity> {
    throw new Error('Method not implemented.');
  }
}
