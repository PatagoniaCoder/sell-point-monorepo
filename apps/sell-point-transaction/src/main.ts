import { NestFactory } from '@nestjs/core';
import { SellPointTransactionModule } from './sell-point-transaction.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(SellPointTransactionModule);
  const port = Number(app.get(ConfigService).get('SELL_TRANSACTION_PORT'));
  const logger = new Logger('SellPointTransaction');
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

  await app.listen(port).then(() => logger.log(`SELL TRANSACTION run on port ${port}`));
}
bootstrap();
