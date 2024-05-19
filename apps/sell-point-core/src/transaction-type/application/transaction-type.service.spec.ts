import { Test, TestingModule } from '@nestjs/testing';
import { TransactionTypeService } from './transaction-type.service';
import { TransactionTypeRepository } from '../domain/repository/transaction-type-repository.interface';
import { FilterAccountDto } from '../../account/application/dto/account.dto';
import { EOrderTypes } from '../domain/criteria';

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
    const dto: FilterAccountDto = {
      filters: { filters: [] },
      order: { orderBy: { value: 'any' }, orderType: { value: EOrderTypes.ASC } },
      limit: 0,
      offset: 0,
    };
    await service.findByCriteria(dto);
    expect(repository.findByCriteria).toHaveBeenCalled();
  });
});
