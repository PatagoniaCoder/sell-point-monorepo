import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from '../domain/repository/transaction-repository.interface';
import { TransactionTypeRepository } from '../../transaction-type/domain/repository/transaction-type-repository.interface';
import { AccountRepository } from '../../account/domain/repository/account.repository.interface';
import { AccountEntity } from '../../account/infrastructure/database/mysql/entity/account-entity';
import { TransactionTypeEntity } from '../../transaction-type/infrastructure/database/mysql/entity/transaction-type-entity';

describe('TransactionService', () => {
  let service: TransactionService;
  let transactionRepository: TransactionRepository;
  let accountRepository: AccountRepository;
  let transactionTypeRepository: TransactionTypeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: TransactionRepository,
          useValue: {
            findByCriteria: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue({}),
            findByUuid: jest.fn().mockResolvedValue({}),
            createTransaction: jest.fn().mockResolvedValue({}),
            updateTransaction: jest.fn().mockResolvedValue({}),
            deleteTransaction: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: TransactionTypeRepository,
          useValue: {
            findByCriteria: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue({}),
            findByUuid: jest.fn().mockResolvedValue({}),
            createTransactionType: jest.fn().mockResolvedValue({}),
            updateTransactionType: jest.fn().mockResolvedValue({}),
            deleteTransactionType: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: AccountRepository,
          useValue: {
            findByCriteria: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue({}),
            findByUuid: jest.fn().mockResolvedValue({}),
            createAccount: jest.fn().mockResolvedValue({}),
            updateAccount: jest.fn().mockResolvedValue({}),
            deleteAccount: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    transactionRepository = module.get<TransactionRepository>(TransactionRepository);
    transactionTypeRepository = module.get<TransactionTypeRepository>(
      TransactionTypeRepository,
    );
    accountRepository = module.get<AccountRepository>(AccountRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create Transaction', async () => {
    const transaction = {
      transactionTypeUuid: 'b08dbdbf-d667-440c-a0ae-64d26e0d21c3',
      transactionAccountFromUuid: '15c03a77-0d29-4a61-a649-b9823a585259',
      transactionAccountToUuid: '15c03a77-0d29-4a61-a649-b9823a585259',
      transactionAmount: 120,
    };
    jest
      .spyOn(transactionTypeRepository, 'findByUuid')
      .mockResolvedValue({} as TransactionTypeEntity);
    jest.spyOn(accountRepository, 'findByUuid').mockResolvedValue({} as AccountEntity);
    jest.spyOn(transactionRepository, 'createTransaction');
    await service.createTransaction(transaction);
    expect(transactionTypeRepository.findByUuid).toHaveBeenCalled();
    expect(accountRepository.findByUuid).toHaveBeenCalledTimes(2);
    expect(transactionRepository.createTransaction).toHaveBeenCalled();
  });
});
