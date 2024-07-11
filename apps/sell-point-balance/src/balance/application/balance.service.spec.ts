import { Test, TestingModule } from '@nestjs/testing';
//import { EOrderTypes } from '@sell-point-balance-share/domain/criteria';
import { ClientKafka } from '@nestjs/microservices';
import { DecimalValueObject } from '@sell-point-balance/domain/value-object/decimal.value';
import { BalanceRepository } from '../domain/repository/balance.repository';
import { BalanceService } from './balance.service';
import { BalanceCreateDto } from './dto/balance.dto';
//import { FilterBalanceDto } from './dto/balance.dto';
import { BalanceAccountCreateEvent } from '@sell-point-balance/domain/events/balance-account-create.event';
import { v4 as uuid4 } from 'uuid';
jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('7907fba0-fe38-4c61-84ba-1c6b9b2ee6e9'),
}));

describe('BalanceService', () => {
  let service: BalanceService;
  let repository: BalanceRepository;
  let accountClient: ClientKafka;
  const payload = new BalanceCreateDto();
  payload.key = '123456-123456';
  payload.value = { accountUuid: '123456-123456' };
  const balanceMock = {
    uuid: uuid4(),
    key: payload.key,
    accountUuid: payload.value.accountUuid,
    balanceAmountBefore: new DecimalValueObject(0).value,
    balanceAmountAfter: new DecimalValueObject(0).value,
    amount: new DecimalValueObject(0).value,
  };
  const balanceMessageMock = new BalanceAccountCreateEvent(
    balanceMock.key,
    balanceMock.accountUuid,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BalanceService,
        { provide: 'ACCOUNT_SERVICE', useValue: { emit: jest.fn() } },
        {
          provide: BalanceRepository,
          useValue: { createBalance: jest.fn(), findAllByCriteria: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<BalanceService>(BalanceService);
    repository = module.get<BalanceRepository>(BalanceRepository);
    accountClient = module.get<ClientKafka>('ACCOUNT_SERVICE');
  });

  it('should be defined', () => {
    repository; //delete
    accountClient; //delete
    balanceMessageMock; //delete
    expect(service).toBeDefined();
  });
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
