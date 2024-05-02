import { NestFactory } from '@nestjs/core';
import { SellPointCoreModule } from './sell-point-core.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(SellPointCoreModule);
  const port = app.get(ConfigService).get('SELL_CORE_PORT');
  const logger = new Logger('SellPointCore');
  app.enableCors();
  await app
    .listen(port)
    .then(() => logger.log(`SELL CORE run on port ${port}`));
}
bootstrap();
