import { NestFactory } from '@nestjs/core';
import { LocalAccountServerModule } from './local-account-server.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(LocalAccountServerModule);

  app.useStaticAssets(join(__dirname, 'public'), { prefix: '/public/' });
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('hbs');

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({ origin: '*' });

  const port = app.get(ConfigService).get('LOCAL_ACCOUNT_PORT');
  const logger = new Logger('LocalCredentialsServer');

  await app.listen(port).then(() => logger.log(`LOCAL ACCOUNT SERVER run on port ${port}`));
}
bootstrap();
