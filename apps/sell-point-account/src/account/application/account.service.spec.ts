import { Test, TestingModule } from '@nestjs/testing';
import { EOrderTypes } from '@sell-point-account-share/domain/criteria';
import { AccountRepository } from '../domain/repository/account.repository.interface';
import { AccountService } from './account.service';
import { FilterAccountDto } from './dto/account.dto';

describe('AccountService', () => {
  let service: AccountService;
  let repository: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        { provide: AccountRepository, useValue: { findByCriteria: jest.fn() } },
        {
          provide: 'BALANCE_API',
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    repository = module.get<AccountRepository>(AccountRepository);
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
