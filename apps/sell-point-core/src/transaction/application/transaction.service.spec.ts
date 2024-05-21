import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from '../domain/repository/transaction-repository.interface';
import { TransactionTypeRepository } from '../../transaction-type/domain/repository/transaction-type-repository.interface';
import { AccountRepository } from '../../account/domain/repository/account.repository.interface';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        { provide: TransactionRepository, useValue: {} },
        { provide: TransactionTypeRepository, useValue: {} },
        { provide: AccountRepository, useValue: {} },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
