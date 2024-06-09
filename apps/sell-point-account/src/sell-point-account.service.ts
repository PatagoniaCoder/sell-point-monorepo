import { Injectable } from '@nestjs/common';

@Injectable()
export class SellPointAccountService {
  getHello(): string {
    return 'Hello World!';
  }
}
