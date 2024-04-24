import { TestingModule, Test } from '@nestjs/testing';
import { AuthApiService } from './auth-api.service';
import { UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../domain/repository/user.repository';

describe('AuthApiService', () => {
  let authApiService: AuthApiService;
  const usersMock = [
    {
      uuid: '1',
      email: 'some@email.com',
      name: 'john',
      username: 'john',
      password: '$2b$10$2xF/8BaDvJZUfh9508ZBK.z0CkSBnQD1oUIM/CSop6/AzZcuTNOha',
      plainPassword: 'change',
    },
    {
      uuid: '2',
      email: 'other@email.com',
      name: 'maria',
      username: 'maria',
      password: '$2b$10$2ATVchGmszgaoN1DqGiy8e3uhwYq6QijbOvnSAmHJCu35CLoHpESK',
      plainPassword: 'guess',
    },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthApiService,
        {
          provide: UserRepository,
          useValue: {
            findUserByUsername: (value) => {
              const user = usersMock.find((user) => user.username === value);
              return user;
            },
          },
        },
      ],
    }).compile();

    authApiService = app.get<AuthApiService>(AuthApiService);
  });

  it('should be defined', () => {
    expect(authApiService).toBeDefined();
  });

  it('should validate user', async () => {
    const user = await authApiService.validate({
      username: 'john',
      password: 'change',
    });
    expect(user).toBeDefined();
  });

  it('should throw a UnauthorizedException exception user', async () => {
    await authApiService
      .validate({
        username: 'john',
        password: 'any',
      })
      .catch((err) => expect(err).toBeInstanceOf(UnauthorizedException));
  });
});
