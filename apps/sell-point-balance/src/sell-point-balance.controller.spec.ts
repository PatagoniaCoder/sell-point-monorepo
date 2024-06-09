import { Test, TestingModule } from '@nestjs/testing';
import { SellPointBalanceController } from './sell-point-balance.controller';
import { SellPointBalanceService } from './sell-point-balance.service';

describe('SellPointBalanceController', () => {
  let sellPointBalanceController: SellPointBalanceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SellPointBalanceController],
      providers: [SellPointBalanceService],
    }).compile();

    sellPointBalanceController = app.get<SellPointBalanceController>(
      SellPointBalanceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sellPointBalanceController.getHello()).toBe('Hello World!');
    });
  });
});
