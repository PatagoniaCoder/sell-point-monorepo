import { Controller, Get } from '@nestjs/common';
import { SellPointTransactionService } from './sell-point-transaction.service';

@Controller()
export class SellPointTransactionController {
  constructor(private readonly sellPointTransactionService: SellPointTransactionService) {}

  @Get()
  getHello(): string {
    return this.sellPointTransactionService.getHello();
  }
}
