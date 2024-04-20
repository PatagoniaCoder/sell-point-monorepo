import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalAccountServerService {
  index(): { message: string } {
    return { message: 'Hello World!' };
  }
}
