import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { AccountStatus } from '../domain/entity/entity-account';
import { AccountService } from './account.service';
import { ResponseMessage } from './dto/account.dto';
import { ClientKafka } from '@nestjs/microservices';
import { AccountEventPattern } from '../shared/event.pattern';
import { v4 as uuid4 } from 'uuid';
import { CreateAccountEvent } from '../domain/events/create-account.events';
import { HttpStatus } from '@nestjs/common';
import { AccountRepository } from '../domain/repository/account.repository.interface';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('7907fba0-fe38-4c61-84ba-1c6b9b2ee6e9'),
}));

describe('AccountService', () => {
  let service: AccountService;
  let accountClient: ClientKafka;

  const accountMock = {
    accountNumber: '00001',
    description: 'Mock of account',
    status: AccountStatus.PENDING,
    uuid: '00001',
  };

  const responseMessageMock: ResponseMessage = {
    key: uuid4(),
    value: accountMock,
  };

  const accountDtoMock = {
    accountNumber: accountMock.accountNumber,
    description: accountMock.description,
  };

  const accountMessageMock = new CreateAccountEvent({
    accountNumber: accountDtoMock.accountNumber,
    description: accountDtoMock.description,
    randomKey: uuid4(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        { provide: 'ACCOUNT_SERVICE', useValue: { send: jest.fn() } },
        { provide: AccountRepository, useValue: {} },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    accountClient = module.get<ClientKafka>('ACCOUNT_SERVICE');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Should create an account', () => {
    let result: ResponseMessage;

    beforeEach(async () => {
      jest.spyOn(accountClient, 'send').mockReturnValue(of(responseMessageMock));
      result = await service.createAccount(accountDtoMock);
    });

    it('should have been called "accountClient.send"', () => {
      expect(accountClient.send).toHaveBeenCalledWith(
        AccountEventPattern.CREATE,
        accountMessageMock.toString(),
      );
    });

    it('should return a response message', () => {
      expect(result).toEqual(responseMessageMock);
    });
  });

  describe('Should fail on create an account', () => {
    let error: any;
    beforeEach(async () => {
      jest
        .spyOn(accountClient, 'send')
        .mockReturnValue(throwError(() => new Error('Something wrong!!')));
      jest.spyOn(service.logger, 'error');
      error = await service.createAccount(accountDtoMock).catch((err) => err);
    });

    it('the error message returned should be "Cannot create an account."', () => {
      expect(error.message).toBe('Cant create an account');
    });

    it('should return failed request with status code 400', () => {
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should have been called "logger.error"', () => {
      expect(service.logger.error).toHaveBeenCalled();
    });
  });

  /* it('should be execute the findByCriteria', async () => {
    const dto: FilterAccountDto = {
      filters: { filters: [] },
      order: { orderBy: { value: 'any' }, orderType: { value: EOrderTypes.ASC } },
      limit: 0,
      offset: 0,
    };
    await service.findByCriteria(dto);
    expect(repository.findByCriteria).toHaveBeenCalled();
  }); */
});
