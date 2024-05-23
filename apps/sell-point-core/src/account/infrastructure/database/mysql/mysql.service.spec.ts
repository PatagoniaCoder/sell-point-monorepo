import { Test, TestingModule } from '@nestjs/testing';
import { MysqlService } from './mysql.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountEntity } from './entity/account-entity';
import { BalanceEntity } from '../../../../balance/infrastructure/database/mysql/entity/balance-entity';

describe('MysqlService', () => {
  let service: MysqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MysqlService,
        { provide: getRepositoryToken(AccountEntity), useValue: {} },
        { provide: getRepositoryToken(BalanceEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<MysqlService>(MysqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
