import { Module } from '@nestjs/common';
import { AuthApiController } from './application/auth-api.controller';
import { AuthApiService } from './application/auth-api.service';
import { DummyDBModule } from './infrastructure/database/dummy-db/dummy-db.module';
import { DummyDBService } from './infrastructure/database/dummy-db/dummy-db.service';
import { UserRepository } from './domain/repository/user.repository';

@Module({
  imports: [DummyDBModule],
  controllers: [AuthApiController],
  providers: [
    AuthApiService,
    { provide: UserRepository, useClass: DummyDBService },
  ],
})
export class AuthApiModule {}
