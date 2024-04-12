import { Test, TestingModule } from '@nestjs/testing';
import { LocalAccountServerController } from './local-account-server.controller';
import { LocalAccountServerService } from './local-account-server.service';

describe('LocalAccountServerController', () => {
  let localAccountServerController: LocalAccountServerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LocalAccountServerController],
      providers: [LocalAccountServerService],
    }).compile();

    localAccountServerController = app.get<LocalAccountServerController>(
      LocalAccountServerController,
    );
  });

  describe('root', () => {
    it('should render a index page', () => {
      expect(localAccountServerController.getHello(null)).toEqual({
        message: 'Hello World!',
      });
    });
  });
});
