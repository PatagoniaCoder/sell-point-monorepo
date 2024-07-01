import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SellPointCoreModule } from './sell-point-core.module';

async function bootstrap() {
  const app = await NestFactory.create(SellPointCoreModule);
  const port = Number(app.get(ConfigService).get('SELL_CORE_PORT'));
  const logger = new Logger('SellPointCore');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(port).then(() => logger.log(`SELL CORE run on port ${port}`));
}
bootstrap();
