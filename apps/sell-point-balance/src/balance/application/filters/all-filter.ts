import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(BadRequestException)
export class AllError implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('exception', JSON.stringify(exception));
    console.log('host', JSON.stringify(host));
    return new Error('Method not implemented.');
  }
}
