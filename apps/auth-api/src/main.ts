import { NestFactory } from '@nestjs/core';
import { AuthApiModule } from './auth-api.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthApiModule);
  await app.listen(3002);
}
bootstrap();
