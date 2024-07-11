import { ClientKafka } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { EOrderTypes } from '@sell-point-account-share/domain/criteria';
import { BalanceEventPattern } from '@sell-point-account-share/infrastructure/event.pattern';
import { AccountStatus } from '@sell-point-account/domain/entity/entity-account';
import { BalanceAccountCreateEvent } from '@sell-point-account/domain/events/balance-account-create.event';
import { v4 as uuid4 } from 'uuid';
import { AccountRepository } from '../domain/repository/account.repository';
import { AccountService } from './account.service';
import { FilterAccountDto, ResponseMessage } from './dto/account.dto';
jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('7907fba0-fe38-4c61-84ba-1c6b9b2ee6e9'),
}));
describe('AccountService', () => {
  let service: AccountService;
  let repository: AccountRepository;
  let balanceClient: ClientKafka;

  const accountDtoMock = {
    key: '11111-22222',
    value: { accountNumber: '00001', description: 'Mock of account' },
  };

  const accountMock = {
    accountNumber: accountDtoMock.value.accountNumber,
    description: accountDtoMock.value.description,
    status: AccountStatus.PENDING,
    uuid: uuid4(),
    key: accountDtoMock.key,
  };
  const accountMessageMock = new BalanceAccountCreateEvent(accountMock);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: AccountRepository,
          useValue: { findByCriteria: jest.fn(), createAccount: jest.fn() },
        },
        {
          provide: 'BALANCE_SERVICE',
          useValue: { emit: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    repository = module.get<AccountRepository>(AccountRepository);
    balanceClient = module.get<ClientKafka>('BALANCE_SERVICE');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Should create an account', () => {
    let result: ResponseMessage;
    beforeEach(async () => {
      jest.spyOn(balanceClient, 'emit');
      jest.spyOn(repository, 'createAccount');
      result = await service.createAccount(accountDtoMock);
    });

    it('should have been called "accountRepository.createAccount"', async () => {
      expect(repository.createAccount).toHaveBeenCalledWith(accountMock);
    });

    it('should have been called "balanceClient.emit"', () => {
      expect(balanceClient.emit).toHaveBeenCalledWith(
        BalanceEventPattern.ACCOUNT_CREATED,
        accountMessageMock.toString(),
      );
    });

    it('should return a response message object with a new account', () => {
      expect(result).toEqual({ key: accountDtoMock.key, value: accountMock });
    });
  });

  describe('Should fail on create an account', () => {
    let error: any;
    beforeEach(async () => {
      jest.spyOn(balanceClient, 'emit');
      jest
        .spyOn(repository, 'createAccount')
        .mockRejectedValue(new Error('Something wrong!!'));
      error = await service.createAccount(accountDtoMock).catch((err) => err);
    });

    it('the error message returned should be "Cannot create an account."', () => {
      expect(error.message).toBe('Something wrong!!');
    });

    it("shouldn't have been called 'balanceClient.emit'", () => {
      expect(balanceClient.emit).not.toHaveBeenCalled();
    });
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
