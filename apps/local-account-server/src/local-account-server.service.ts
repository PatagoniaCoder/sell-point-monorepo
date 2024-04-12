import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalAccountServerService {
  getHello(): string {
    return 'Hello World!';
  }
}
