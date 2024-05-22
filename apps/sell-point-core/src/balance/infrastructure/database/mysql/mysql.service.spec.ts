import { Test, TestingModule } from '@nestjs/testing';
import { MysqlService } from './mysql.service';
import { BalanceEntity } from './entity/balance-entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MysqlService', () => {
  let service: MysqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MysqlService, { provide: getRepositoryToken(BalanceEntity), useValue: {} }],
    }).compile();

    service = module.get<MysqlService>(MysqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
