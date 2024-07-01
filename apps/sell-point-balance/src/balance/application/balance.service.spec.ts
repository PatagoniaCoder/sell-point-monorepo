import { Test, TestingModule } from '@nestjs/testing';
//import { EOrderTypes } from '@sell-point-balance-share/domain/criteria';
import { BalanceRepository } from '../domain/repository/balance.repository';
import { BalanceService } from './balance.service';
//import { FilterBalanceDto } from './dto/balance.dto';

describe('BalanceService', () => {
  let service: BalanceService;
  //let repository: BalanceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BalanceService,
        { provide: 'ACCOUNT_SERVICE', useValue: {} },
        { provide: BalanceRepository, useValue: { findAllByCriteria: jest.fn() } },
      ],
    }).compile();

    service = module.get<BalanceService>(BalanceService);
    // repository = module.get<BalanceRepository>(BalanceRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*   it('should be execute the findByCriteria', async () => {
    const dto: FilterBalanceDto = {
      filters: { filters: [] },
      order: { orderBy: { value: 'any' }, orderType: { value: EOrderTypes.ASC } },
      limit: 0,
      offset: 0,
    };
    await service.findAllByCriteria(dto);
    expect(repository.findAllByCriteria).toHaveBeenCalled();
  }); */
});
