import { Module } from '@nestjs/common';
import { DummyDBService } from './dummy-db.service';

@Module({
  providers: [DummyDBService],
  exports: [DummyDBService],
})
export class DummyDBModule {}
