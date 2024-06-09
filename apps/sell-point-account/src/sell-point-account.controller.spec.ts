import { Test, TestingModule } from '@nestjs/testing';
import { SellPointAccountController } from './sell-point-account.controller';
import { SellPointAccountService } from './sell-point-account.service';

describe('SellPointAccountController', () => {
  let sellPointAccountController: SellPointAccountController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SellPointAccountController],
      providers: [SellPointAccountService],
    }).compile();

    sellPointAccountController = app.get<SellPointAccountController>(
      SellPointAccountController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sellPointAccountController.getHello()).toBe('Hello World!');
    });
  });
});
