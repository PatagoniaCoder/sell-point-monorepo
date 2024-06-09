import { Test, TestingModule } from '@nestjs/testing';
import { SellPointTransactionController } from './sell-point-transaction.controller';
import { SellPointTransactionService } from './sell-point-transaction.service';

describe('SellPointTransactionController', () => {
  let sellPointTransactionController: SellPointTransactionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SellPointTransactionController],
      providers: [SellPointTransactionService],
    }).compile();

    sellPointTransactionController = app.get<SellPointTransactionController>(
      SellPointTransactionController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sellPointTransactionController.getHello()).toBe('Hello World!');
    });
  });
});
