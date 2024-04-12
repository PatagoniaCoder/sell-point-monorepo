import { Controller, Get } from '@nestjs/common';
import { LocalAccountServerService } from './local-account-server.service';

@Controller()
export class LocalAccountServerController {
  constructor(private readonly localAccountServerService: LocalAccountServerService) {}

  @Get()
  getHello(): string {
    return this.localAccountServerService.getHello();
  }
}
