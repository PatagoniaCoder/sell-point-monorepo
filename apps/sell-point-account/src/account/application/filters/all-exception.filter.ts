import { BadRequestException, Catch, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(BadRequestException)
export class BadRequestExceptionFilter {
  logger = new Logger(BadRequestExceptionFilter.name);
  catch(exception: BadRequestException) {
    this.logger.error(exception.getResponse());
    throw new RpcException(exception.getResponse());
  }
}
