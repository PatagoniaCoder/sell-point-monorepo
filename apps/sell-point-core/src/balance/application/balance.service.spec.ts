import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from './balance.service';
import { BalanceRepository } from '../domain/repository/balance-repository.interface';
import { FilterBalanceDto } from './dto/balance.dto';
import { EOrderTypes } from '../domain/criteria';

describe('BalanceService', () => {
  let service: BalanceService;
  let repository: BalanceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BalanceService,
        { provide: BalanceRepository, useValue: { findByCriteria: jest.fn() } },
      ],
    }).compile();

    service = module.get<BalanceService>(BalanceService);
    repository = module.get<BalanceRepository>(BalanceRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be execute the findByCriteria', async () => {
    const dto: FilterBalanceDto = {
      filters: { filters: [] },
      order: { orderBy: { value: 'any' }, orderType: { value: EOrderTypes.ASC } },
      limit: 0,
      offset: 0,
    };
    await service.findByCriteria(dto);
    expect(repository.findByCriteria).toHaveBeenCalled();
  });
});
