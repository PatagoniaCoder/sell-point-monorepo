import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountCreateMessage } from './dto/account.dto';
import { RpcException } from '@nestjs/microservices';

describe('AccountController', () => {
  let controller: AccountController;
  let service: AccountService;
  const payload = new AccountCreateMessage();
  payload.key = '123456-123456';
  payload.value = { accountNumber: '0001', description: 'test account' };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: {
            findByCriteria: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue({}),
            createAccount: jest.fn().mockResolvedValue({}),
            updateAccount: jest.fn().mockResolvedValue({}),
            deleteAccount: jest.fn().mockResolvedValue({}),
            balanceCreatedSuccess: jest.fn().mockResolvedValue({}),
            balanceCreatedFails: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('filter endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'findByCriteria');
    });
    it('should filter be defined', () => {
      expect(controller.filter).toBeDefined();
    });

    it('should findByCriteria have been called', () => {
      controller.filter(null);
      expect(service.findByCriteria).toHaveBeenCalled();
    });
  });

  describe('findAllAccounts endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'findAll');
    });
    it('should findAllAccounts be defined', () => {
      expect(controller.findAllAccounts).toBeDefined();
    });
    it('should findAll have been called', () => {
      controller.findAllAccounts();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('createAccountMessage endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'createAccount');
      jest.spyOn(controller.logger, 'error');
    });

    it('should createAccountMessage be defined', () => {
      expect(controller.createAccountMessage).toBeDefined();
    });

    it('should createAccount have been called', async () => {
      await controller.createAccountMessage(payload);
      expect(service.createAccount).toHaveBeenCalledWith(payload);
    });

    it('should fail on createAccount and throw a "RpcException" exception', async () => {
      jest.spyOn(service, 'createAccount').mockRejectedValue(new Error('Something is wrong!'));
      await controller.createAccountMessage(payload).catch((err) => {
        expect(err).toBeInstanceOf(RpcException);
      });
    });

    it('should fail on createAccount logger have been called', async () => {
      jest
        .spyOn(service, 'createAccount')
        .mockRejectedValueOnce(new Error('Something is wrong!'));
      await controller.createAccountMessage(payload).catch(() => {
        expect(controller.logger.error).toHaveBeenCalled();
      });
    });
  });

  describe('deleteAccount endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'deleteAccount');
    });
    it('should deleteAccount be defined', () => {
      expect(controller.deleteAccount).toBeDefined();
    });

    it('should deleteAccount have been called', () => {
      controller.deleteAccount(null);
      expect(service.deleteAccount).toHaveBeenCalled();
    });
  });

  describe('updateAccount endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'updateAccount');
    });
    it('should updateAccount be defined', () => {
      expect(controller.updateAccount).toBeDefined();
    });
    it('should updateAccount have been called', () => {
      controller.updateAccount(null, null);
      expect(service.updateAccount).toHaveBeenCalled();
    });
  });

  describe('updateAccount endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'updateAccount');
    });
    it('should updateAccount be defined', () => {
      expect(controller.updateAccount).toBeDefined();
    });
    it('should updateAccount have been called', () => {
      controller.updateAccount(null, null);
      expect(service.updateAccount).toHaveBeenCalled();
    });
  });

  describe('balanceCreated endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'balanceCreatedSuccess');
    });
    it('should balanceCreated be defined', () => {
      expect(controller.balanceCreated).toBeDefined();
    });
    it('should balanceCreated have been called', () => {
      controller.balanceCreated(null);
      expect(service.balanceCreatedSuccess).toHaveBeenCalled();
    });
  });

  describe('balanceCreatedFails endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'balanceCreatedFails');
    });
    it('should balanceCreatedFails be defined', () => {
      expect(controller.balanceCreated).toBeDefined();
    });
    it('should balanceCreatedFails have been called', () => {
      controller.balanceCreatedFails(null);
      expect(service.balanceCreatedFails).toHaveBeenCalled();
    });
  });
});
