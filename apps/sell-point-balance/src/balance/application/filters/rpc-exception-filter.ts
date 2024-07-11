import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { KafkaContext, RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const kafkaContext: KafkaContext = host.getArgs()[1];
    console.log('un errorrrrr....................');
    return throwError(() => ({
      kafkaHeaders: kafkaContext.getMessage().headers,
      error: exception.getError(),
    }));
  }
}
