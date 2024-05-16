import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

describe('AccountController', () => {
  let controller: AccountController;
  let service: AccountService;

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

    it('should be findByCriteria to Have Been Called', () => {
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
    it('should be findAll to Have Been Called', () => {
      controller.findAllAccounts();
      expect(service.findAll).toHaveBeenCalled();
    });
  });
  describe('createAccount endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'createAccount');
    });
    it('should createAccount be defined', () => {
      expect(controller.createAccount).toBeDefined();
    });

    it('should be createAccount to Have Been Called', () => {
      controller.createAccount(null);
      expect(service.createAccount).toHaveBeenCalled();
    });
  });

  describe('deleteAccount endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'deleteAccount');
    });
    it('should deleteAccount be defined', () => {
      expect(controller.deleteAccount).toBeDefined();
    });

    it('should be deleteAccount to Have Been Called', () => {
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
    it('should be updateAccount to Have Been Called', () => {
      controller.updateAccount(null, null);
      expect(service.updateAccount).toHaveBeenCalled();
    });
  });
});
