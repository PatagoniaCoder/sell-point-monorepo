import { Test, TestingModule } from '@nestjs/testing';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

describe('BalanceController', () => {
  let controller: BalanceController;
  let service: BalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalanceController],
      providers: [
        {
          provide: BalanceService,
          useValue: {
            findAllByCriteria: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue({}),
            createBalance: jest.fn().mockResolvedValue({}),
            updateBalance: jest.fn().mockResolvedValue({}),
            deleteBalance: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<BalanceController>(BalanceController);
    service = module.get<BalanceService>(BalanceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /*   describe('filter endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'findAllByCriteria');
    });
    it('should filter be defined', () => {
      expect(controller.filter).toBeDefined();
    });

    it('should findByCriteria have been called', () => {
      controller.filter(null);
      expect(service.findAllByCriteria).toHaveBeenCalled();
    });
  });
  describe('findAllBalances endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'findAll');
    });
    it('should findAllBalances be defined', () => {
      expect(controller.findAllBalances).toBeDefined();
    });
    it('should findAll have been called', () => {
      controller.findAllBalances();
      expect(service.findAll).toHaveBeenCalled();
    });
  }); */
  describe('createBalance endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'createBalance');
    });
    it('should createBalance be defined', () => {
      expect(controller.createBalance).toBeDefined();
    });

    it('should createBalance have been called', () => {
      controller.createBalance(null);
      expect(service.createBalance).toHaveBeenCalled();
    });
  });

  /*   describe('deleteBalance endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'deleteBalance');
    });
    it('should deleteBalance be defined', () => {
      expect(controller.deleteBalance).toBeDefined();
    });

    it('should deleteBalance have been called', () => {
      controller.deleteBalance(null);
      expect(service.deleteBalance).toHaveBeenCalled();
    });
  });
  describe('updateBalance endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'updateBalance');
    });
    it('should updateBalance be defined', () => {
      expect(controller.updateBalance).toBeDefined();
    });
    it('should updateBalance have been called', () => {
      controller.updateBalance(null, null);
      expect(service.updateBalance).toHaveBeenCalled();
    });
  }); */
});
