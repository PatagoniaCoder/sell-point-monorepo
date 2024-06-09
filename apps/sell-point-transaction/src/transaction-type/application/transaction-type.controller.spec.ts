import { Test, TestingModule } from '@nestjs/testing';
import { TransactionTypeController } from './transaction-type.controller';
import { TransactionTypeService } from './transaction-type.service';

describe('TransactionTypeController', () => {
  let controller: TransactionTypeController;
  let service: TransactionTypeService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionTypeController],
      providers: [
        {
          provide: TransactionTypeService,
          useValue: {
            findByCriteria: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue({}),
            createTransactionType: jest.fn().mockResolvedValue({}),
            updateTransactionType: jest.fn().mockResolvedValue({}),
            deleteTransactionType: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<TransactionTypeController>(TransactionTypeController);
    service = module.get<TransactionTypeService>(TransactionTypeService);
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
  describe('findAllTransactionTypes endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'findAll');
    });
    it('should findAllTransactionTypes be defined', () => {
      expect(controller.findAllTransactionTypes).toBeDefined();
    });
    it('should findAll have been called', () => {
      controller.findAllTransactionTypes();
      expect(service.findAll).toHaveBeenCalled();
    });
  });
  describe('createTransactionType endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'createTransactionType');
    });
    it('should createTransactionType be defined', () => {
      expect(controller.createTransactionType).toBeDefined();
    });

    it('should createTransactionType have been called', () => {
      controller.createTransactionType(null);
      expect(service.createTransactionType).toHaveBeenCalled();
    });
  });

  describe('deleteTransactionType endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'deleteTransactionType');
    });
    it('should deleteTransactionType be defined', () => {
      expect(controller.deleteTransactionType).toBeDefined();
    });

    it('should deleteTransactionType have been called', () => {
      controller.deleteTransactionType(null);
      expect(service.deleteTransactionType).toHaveBeenCalled();
    });
  });
  describe('updateTransactionType endpoint', () => {
    beforeEach(() => {
      jest.spyOn(service, 'updateTransactionType');
    });
    it('should updateTransactionType be defined', () => {
      expect(controller.updateTransactionType).toBeDefined();
    });
    it('should updateTransactionType have been called', () => {
      controller.updateTransactionType(null, null);
      expect(service.updateTransactionType).toHaveBeenCalled();
    });
  });
});
