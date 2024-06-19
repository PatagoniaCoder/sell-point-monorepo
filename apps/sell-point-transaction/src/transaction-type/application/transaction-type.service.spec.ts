import { Test, TestingModule } from '@nestjs/testing';
import { EOrderTypes } from '@sell-point-transaction-share/domain/criteria';
import { TransactionTypeRepository } from '../domain/repository/transaction-type.repository';
import { FilterTransactionTypeDto } from './dto/transaction-type.dto';
import { TransactionTypeService } from './transaction-type.service';

describe('TransactionTypeService', () => {
  let service: TransactionTypeService;
  let repository: TransactionTypeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionTypeService,
        { provide: TransactionTypeRepository, useValue: { findByCriteria: jest.fn() } },
      ],
    }).compile();

    service = module.get<TransactionTypeService>(TransactionTypeService);
    repository = module.get<TransactionTypeRepository>(TransactionTypeRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be execute the findByCriteria', async () => {
    const dto: FilterTransactionTypeDto = {
      filters: { filters: [] },
      order: { orderBy: { value: 'any' }, orderType: { value: EOrderTypes.ASC } },
      limit: 0,
      offset: 0,
    };
    await service.findByCriteria(dto);
    expect(repository.findByCriteria).toHaveBeenCalled();
  });
});
