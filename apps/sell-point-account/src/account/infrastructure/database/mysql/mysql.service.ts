import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Criteria } from '@sell-point-account-share/domain/criteria';
import { MySqlCriteriaConverter } from '@sell-point-account-share/infrastructure/database/mysql/mysql-criteria-convertor';
import { AccountRepository } from '@sell-point-account/domain/repository/account.repository';
import { AccountValue } from '@sell-point-account/domain/value-object/account.value';
import { Repository } from 'typeorm';
import { AccountEntity } from './entity/account.entity';

@Injectable()
export class MysqlService extends MySqlCriteriaConverter implements AccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {
    super();
  }

  async createAccount(value: AccountValue): Promise<AccountEntity> {
    const newAccount = this.accountRepository.create(value);
    return await this.accountRepository.save(newAccount);
  }

  async findAllAccounts(): Promise<AccountEntity[]> {
    return await this.accountRepository.find({ take: 20 });
  }

  async findByCriteria(queryParams: Criteria): Promise<AccountEntity[]> {
    const { filter, order, limit, skip } = this.convert(queryParams);
    return await this.accountRepository.find({
      where: filter.where,
      order: order,
      take: limit,
      skip: skip,
    });
  }

  async findByUuid(uuid: string): Promise<AccountEntity> {
    return await this.accountRepository.findOne({ where: { uuid } });
  }

  async deleteAccount(uuid: string): Promise<void> {
    const entity = await this.accountRepository
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
    await this.accountRepository.softDelete({ uuid });
  }

  async updateAccount(uuid: string, value: Partial<AccountValue>): Promise<AccountEntity> {
    await this.accountRepository.update({ uuid }, value);
    return await this.accountRepository.findOne({ where: { uuid } });
  }
}
