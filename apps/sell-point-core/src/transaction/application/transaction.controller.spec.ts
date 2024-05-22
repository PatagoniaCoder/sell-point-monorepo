import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

describe('TransactionController', () => {
  let controller: TransactionController;
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            findByCriteria: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue({}),
            createTransaction: jest.fn().mockResolvedValue({}),
            updateTransaction: jest.fn().mockResolvedValue({}),
            deleteTransaction: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    service = module.get<TransactionService>(TransactionService);
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
  describe('findAllTransactions endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'findAll');
    });
    it('should findAllTransactions be defined', () => {
      expect(controller.findAllTransactions).toBeDefined();
    });
    it('should findAll have been called', () => {
      controller.findAllTransactions();
      expect(service.findAll).toHaveBeenCalled();
    });
  });
  describe('createTransaction endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'createTransaction');
    });
    it('should createTransaction be defined', () => {
      expect(controller.createTransaction).toBeDefined();
    });

    it('should createTransaction have been called', () => {
      controller.createTransaction(null);
      expect(service.createTransaction).toHaveBeenCalled();
    });
  });

  describe('deleteTransaction endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'deleteTransaction');
    });
    it('should deleteTransaction be defined', () => {
      expect(controller.deleteTransaction).toBeDefined();
    });

    it('should deleteTransaction have been called', () => {
      controller.deleteTransaction(null);
      expect(service.deleteTransaction).toHaveBeenCalled();
    });
  });
  describe('updateTransaction endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'updateTransaction');
    });
    it('should updateTransaction be defined', () => {
      expect(controller.updateTransaction).toBeDefined();
    });
    it('should updateTransaction have been called', () => {
      controller.updateTransaction(null, null);
      expect(service.updateTransaction).toHaveBeenCalled();
    });
  });
});
