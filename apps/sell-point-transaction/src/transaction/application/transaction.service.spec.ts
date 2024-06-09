import { Test, TestingModule } from '@nestjs/testing';
import { TransactionTypeRepository } from '@sell-point-transaction-type/domain/repository/transaction-type-repository.interface';
import { TransactionTypeEntity } from '@sell-point-transaction-type/infrastructure/database/mysql/entity/transaction-type.entity';
import { TransactionRepository } from '../domain/repository/transaction-repository.interface';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let transactionRepository: TransactionRepository;
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
          provide: 'BALANCE_API',
          useValue: { emit: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    transactionRepository = module.get<TransactionRepository>(TransactionRepository);
    transactionTypeRepository = module.get<TransactionTypeRepository>(
      TransactionTypeRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create Transaction', async () => {
    const transaction = {
      transactionTypeUuid: 'b08dbdbf-d667-440c-a0ae-64d26e0d21c3',
      transactionAccountUuid: '15c03a77-0d29-4a61-a649-b9823a585259',
      transactionAmount: 120,
    };
    jest
      .spyOn(transactionTypeRepository, 'findByUuid')
      .mockResolvedValue({} as TransactionTypeEntity);
    jest.spyOn(transactionRepository, 'createTransaction');
    await service.createTransaction(transaction);
    expect(transactionTypeRepository.findByUuid).toHaveBeenCalled();
    expect(transactionRepository.createTransaction).toHaveBeenCalled();
  });
});
