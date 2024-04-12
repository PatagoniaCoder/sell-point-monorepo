import { Controller, Get, Query, Render } from '@nestjs/common';
import { LocalAccountServerService } from './local-account-server.service';
import { IndexDto } from './index.dto';

@Controller()
export class LocalAccountServerController {
  constructor(
    private readonly localAccountServerService: LocalAccountServerService,
  ) {}

  @Get()
  @Render('index')
  getHello(@Query() query: IndexDto) {
    return this.localAccountServerService.getHello();
  }
}
