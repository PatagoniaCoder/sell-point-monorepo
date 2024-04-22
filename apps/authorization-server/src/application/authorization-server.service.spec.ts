import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ClientRepository } from '../domain/repositories/client.repository';
import { AuthorizationServerService } from './authorization-server.service';
import { VerificationCodeRepository } from '../domain/repositories/verification-code.repository';

describe('AuthorizationServerService', () => {
  let service: AuthorizationServerService;
  let clientRepository: ClientRepository;
  let verificationCodeRepository: VerificationCodeRepository;
  const client = {
    uuid: '9b2c99ab-f6dc-48e5-b274-fac2c45cfa83',
    redirectUri: 'http://localhost:3000/home',
    scope: ['photos'],
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        AuthorizationServerService,
        {
          provide: 'CLIENT_REPOSITORY',
          useValue: { findClientById: jest.fn().mockResolvedValue(client) },
        },
        {
          provide: 'VERIFICATION_CODE_REPOSITORY',
          useValue: { saveCodeVerify: jest.fn().mockResolvedValue(client) },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('http://localhost'),
          },
        },
        {
          provide: JwtService,
          useValue: { signAsync: jest.fn() },
        },
      ],
    }).compile();

    service = app.get<AuthorizationServerService>(AuthorizationServerService);
    clientRepository = app.get<ClientRepository>('CLIENT_REPOSITORY');
    verificationCodeRepository = app.get<VerificationCodeRepository>(
      'VERIFICATION_CODE_REPOSITORY',
    );
  });

  describe('generateAuthorizationUrl', () => {
    const clientID = client.uuid;
    const scope = client.scope[0];

    it('should return the authorization Url', async () => {
      jest
        .spyOn(service as any, 'generateRandomString')
        .mockReturnValueOnce('state');
      jest
        .spyOn(service as any, 'generateRandomString')
        .mockReturnValue('codeVerifier');
      jest.spyOn(service as any, 'sha256').mockReturnValue('codeChallenge');
      const url = await service.generateAuthorizationUrl(clientID, scope);
      expect(url).toBe(
        'http://localhost/account?response_type=code&client_id=9b2c99ab-f6dc-48e5-b274-fac2c45cfa83&code_challenge=codeChallenge&code_challenge_method=S256&state=state&redirect=http://localhost/authorization/token',
      );
    });

    it('should save verification code', async () => {
      jest
        .spyOn(service as any, 'generateRandomString')
        .mockReturnValueOnce('state');
      jest
        .spyOn(service as any, 'generateRandomString')
        .mockReturnValue('codeVerifier');
      jest.spyOn(service as any, 'sha256').mockReturnValue('codeChallenge');
      jest.spyOn(verificationCodeRepository, 'saveCodeVerify');
      await service.generateAuthorizationUrl(clientID, scope);
      expect(verificationCodeRepository.saveCodeVerify).toHaveBeenCalled();
    });

    it('should throw BadRequestException with message "Client does not exist"', async () => {
      jest.spyOn(clientRepository, 'findClientById').mockResolvedValue(null);
      await service.generateAuthorizationUrl(clientID, scope).catch((err) => {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toBe('Client does not exist');
      });
    });

    it('should throw BadRequestException with message "Scope not permitted"', async () => {
      client.scope[0] = 'all';
      jest.spyOn(clientRepository, 'findClientById').mockResolvedValue(client);
      await service.generateAuthorizationUrl(clientID, scope).catch((err) => {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toBe('Scope not permitted');
      });
    });
  });
});
