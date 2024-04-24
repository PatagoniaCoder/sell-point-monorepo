import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthorizationServerController } from './authorization-server.controller';
import { AuthorizationServerService } from './authorization-server.service';
import { ClientRepository } from '../domain/repositories/client.repository';
import { VerificationCodeRepository } from '../domain/repositories/verification-code.repository';

describe('AuthorizationServerController', () => {
  let appController: AuthorizationServerController;
  const client = {
    uuid: '9b2c99ab-f6dc-48e5-b274-fac2c45cfa83',
    name: 'nextjs',
    urlRedirect: 'http://localhost:3000/home',
    scope: ['photos'],
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthorizationServerController],
      providers: [
        AuthorizationServerService,
        {
          provide: ClientRepository,
          useValue: { findClientById: jest.fn().mockResolvedValue(client) },
        },
        {
          provide: VerificationCodeRepository,
          useValue: { saveCodeVerify: jest.fn().mockResolvedValue(client) },
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn() },
        },
        {
          provide: JwtService,
          useValue: { signAsync: jest.fn() },
        },
      ],
    }).compile();

    appController = app.get<AuthorizationServerController>(
      AuthorizationServerController,
    );
  });

  describe('root', () => {
    it('should return the authorization Url', async () => {
      const url = await appController.authorize(client.uuid, client.scope[0]);
      expect(url).toBeDefined();
    });
  });
});
