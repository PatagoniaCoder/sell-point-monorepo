import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BadRequestExceptionFilter } from '@sell-point-account/application/filters/all-exception.filter';
import { RPCExceptionFilter } from '@sell-point-account/application/filters/rpc-exception.filter';
import { SellPointAccountModule } from './sell-point-account.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SellPointAccountModule);
  const configService = appContext.get(ConfigService);
  const broker = configService.get('KAFKA_BROKER');
  const clientId = configService.get('ACCOUNT_ID');
  const consumer = configService.get('ACCOUNT_CONSUMER');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SellPointAccountModule,
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
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new RPCExceptionFilter(), new BadRequestExceptionFilter());

  const logger = new Logger('SellPointAccount');

  app.enableShutdownHooks();

  await app.listen().then(() => logger.log(`START SELL ACCOUNT MICROSERVICE`));
}
bootstrap();
