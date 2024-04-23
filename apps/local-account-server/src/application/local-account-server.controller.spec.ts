import { Test, TestingModule } from '@nestjs/testing';
import { LocalAccountServerController } from './local-account-server.controller';
import { LocalAccountServerService } from './local-account-server.service';
import { CryptographyService } from './util/cryptography.service';
import { HttpService } from '@nestjs/axios';

describe('LocalAccountServerController', () => {
  let localAccountServerController: LocalAccountServerController;
  let localAccountServerService: LocalAccountServerService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LocalAccountServerController],
      providers: [
        {
          provide: LocalAccountServerService,
          useValue: { getCode: jest.fn() },
        },
        CryptographyService,
        { provide: HttpService, useValue: { post: jest.fn() } },
      ],
    }).compile();

    localAccountServerController = app.get<LocalAccountServerController>(
      LocalAccountServerController,
    );
    localAccountServerService = app.get<LocalAccountServerService>(
      LocalAccountServerService,
    );
  });

  describe('root', () => {
    it('index should to be defined', () => {
      expect(localAccountServerController.index).toBeDefined();
    });
  });
  describe('concern', () => {
    it('concern should to be defined', async () => {
      expect(localAccountServerController.concern).toBeDefined();
    });

    it('concern should call to generateRandomString', async () => {
      await localAccountServerController.concern(null, null);
      expect(localAccountServerService.getCode).toHaveBeenCalled();
    });
  });
});
