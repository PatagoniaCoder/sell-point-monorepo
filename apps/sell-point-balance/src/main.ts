import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SellPointBalanceModule } from './sell-point-balance.module';

async function bootstrap() {
  const app = await NestFactory.create(SellPointBalanceModule);
  const port = Number(app.get(ConfigService).get('SELL_BALANCE_PORT'));
  const logger = new Logger('SellPointBalance');
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

  app.connectMicroservice({
    transport: Transport.TCP,
  });
  await app.startAllMicroservices().then(() => logger.log(`MICROSERVICE SELL BALANCE is run`));
  await app.listen(port).then(() => logger.log(`SELL BALANCE run on port ${port}`));
}
bootstrap();
