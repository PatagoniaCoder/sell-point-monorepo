import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SellPointBalanceModule } from './sell-point-balance.module';
import { ExceptionFilter } from '@sell-point-balance/application/filters/rpc-exception-filter';
import { AllError } from '@sell-point-balance/application/filters/all-filter';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SellPointBalanceModule);
  const configService = appContext.get(ConfigService);
  const broker = configService.get('KAFKA_BROKER');
  const clientId = configService.get('BALANCE_ID');
  const consumer = configService.get('BALANCE_CONSUMER');
  const logger = new Logger('SellPointBalance');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SellPointBalanceModule,
    {
      transport: Transport.KAFKA,
      options: {
        subscribe: { fromBeginning: true },
        client: {
          brokers: [broker],
          clientId: clientId,
        },
        consumer: {
          groupId: consumer,
          allowAutoTopicCreation: true,
        },
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalFilters(new ExceptionFilter(), new AllError());

  await app.listen().then(() => logger.log(`START SELL BALANCE MICROSERVICE`));
}
bootstrap();
