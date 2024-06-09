import { Controller, Get } from '@nestjs/common';
import { SellPointBalanceService } from './sell-point-balance.service';

@Controller()
export class SellPointBalanceController {
  constructor(private readonly sellPointBalanceService: SellPointBalanceService) {}

  @Get()
  getHello(): string {
    return this.sellPointBalanceService.getHello();
  }
}
