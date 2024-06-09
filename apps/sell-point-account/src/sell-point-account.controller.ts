import { Controller, Get } from '@nestjs/common';
import { SellPointAccountService } from './sell-point-account.service';

@Controller()
export class SellPointAccountController {
  constructor(private readonly sellPointAccountService: SellPointAccountService) {}

  @Get()
  getHello(): string {
    return this.sellPointAccountService.getHello();
  }
}
