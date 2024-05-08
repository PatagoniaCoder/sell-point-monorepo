import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { AccountRepository } from '../domain/repository/account.repository.interface';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService, { provide: AccountRepository, useValue: {} }],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
