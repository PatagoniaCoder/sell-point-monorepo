import { NestFactory } from '@nestjs/core';
import { AppModule } from './authorization-server.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get('AUTHORIZATION_SERVER_PORT');
  const logger = new Logger('LocalCredentialsServer');
  app.enableCors();

  await app.listen(port).then(() => logger.log(`AUTHORIZATION SERVER run on port ${port}`));
}
bootstrap();
