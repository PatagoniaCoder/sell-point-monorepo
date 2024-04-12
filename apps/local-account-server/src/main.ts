import { NestFactory } from '@nestjs/core';
import { LocalAccountServerModule } from './local-account-server.module';

async function bootstrap() {
  const app = await NestFactory.create(LocalAccountServerModule);
  await app.listen(3000);
}
bootstrap();
