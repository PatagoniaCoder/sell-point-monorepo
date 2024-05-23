import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BalanceValue } from '../../../../balance/domain/value-object/balance-value';
import { Criteria } from '../../../domain/criteria/criteria';
import { AccountRepository } from '../../../domain/repository/account.repository.interface';
import { AccountValue } from '../../../domain/value-object/account.value';
import { BalanceEntity } from './../../../../balance/infrastructure/database/mysql/entity/balance-entity';
import { AccountEntity } from './entity/account-entity';
import { MySqlCriteriaConverter } from './mysql-criteria-convertor';

@Injectable()
export class MysqlService extends MySqlCriteriaConverter implements AccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(BalanceEntity)
    private readonly balanceRepository: Repository<BalanceEntity>,
  ) {
    super();
  }

  async createAccount(value: AccountValue): Promise<AccountEntity> {
    return await this.accountRepository.manager.transaction(async (transaction) => {
      const newAccount = this.accountRepository.create(value);
      const balanceValue = new BalanceValue(newAccount, 0);
      const balance = this.balanceRepository.create(balanceValue);
      newAccount.balance = balance;
      await transaction.save(balance);
      await transaction.save(newAccount);
      return newAccount;
    });
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
        relations: { balance: true },
      })
      .catch(() => {
        throw new Error('Could not find any entity');
      });
    if (entity.deleteAt !== null) {
      throw new Error('Entity has already been deleted');
    }
    await this.balanceRepository.softDelete({ uuid: entity.balance.uuid });
    await this.accountRepository.softDelete({ uuid });
  }

  async updateAccount(uuid: string, value: Partial<AccountValue>): Promise<AccountEntity> {
    await this.accountRepository.update({ uuid }, value);
    return await this.accountRepository.findOne({ where: { uuid } });
  }
}
