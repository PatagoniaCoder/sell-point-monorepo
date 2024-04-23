import { Module } from '@nestjs/common';
import { AuthApiController } from './application/auth-api.controller';
import { AuthApiService } from './application/auth-api.service';
import { DummyDBModule } from './infrastructure/database/dummy-db/dummy-db.module';
import { DummyDBService } from './infrastructure/database/dummy-db/dummy-db.service';

@Module({
  imports: [DummyDBModule],
  controllers: [AuthApiController],
  providers: [
    AuthApiService,
    { provide: 'USER_REPOSITORY', useClass: DummyDBService },
  ],
})
export class AuthApiModule {}
