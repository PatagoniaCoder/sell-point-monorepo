import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalAccountServerService {
  getHello(): { message: string } {
    return { message: 'Hello World!' };
  }
}
