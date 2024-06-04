import { Test, TestingModule } from '@nestjs/testing';
import { MysqlService } from './mysql.service';
import { TransactionTypeEntity } from './entity/transaction-type.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MysqlService', () => {
  let service: MysqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MysqlService,
        { provide: getRepositoryToken(TransactionTypeEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<MysqlService>(MysqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
