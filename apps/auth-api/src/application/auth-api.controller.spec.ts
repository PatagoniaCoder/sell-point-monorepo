import { Test, TestingModule } from '@nestjs/testing';
import { AuthApiController } from './auth-api.controller';
import { AuthApiService } from './auth-api.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DummyDBService } from '../infrastructure/database/dummy-db/dummy-db.service';

describe('AuthApiController', () => {
  let authApiController: AuthApiController;
  let authApiService: AuthApiService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthApiController],
      providers: [
        AuthApiService,
        { provide: 'USER_REPOSITORY', useClass: DummyDBService },
      ],
    }).compile();

    authApiController = app.get<AuthApiController>(AuthApiController);
    authApiService = app.get<AuthApiService>(AuthApiService);
  });

  describe('root', () => {
    it('login should be defined"', () => {
      expect(authApiController.login).toBeDefined();
    });

    it('should throw a NotFoundException exception', async () => {
      await authApiController
        .login({ username: 'any', password: 'any' })
        .catch((err) => expect(err).toBeInstanceOf(NotFoundException));
    });
    it('should throw a UnauthorizedException exception', async () => {
      await authApiController
        .login({ username: 'maria', password: 'any' })
        .catch((err) => expect(err).toBeInstanceOf(UnauthorizedException));
    });
  });
});
