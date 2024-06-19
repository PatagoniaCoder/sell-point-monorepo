import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SellPointBalanceModule } from './sell-point-balance.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(SellPointBalanceModule);
  const configService = app.get(ConfigService);
  const port = Number(configService.get('SELL_BALANCE_PORT'));
  const brokerKafka = configService.get('KAFKA_BROKER');
  const consumer = configService.get('BALANCE_CONSUMER');
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
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [brokerKafka],
      },
      consumer: { groupId: consumer },
      subscribe: { fromBeginning: true },
    },
  });
  await app.startAllMicroservices().then(() => logger.log(`START SELL BALANCE MICROSERVICE`));
  await app.listen(port).then(() => logger.log(`SELL BALANCE run on port ${port}`));
}
bootstrap();
