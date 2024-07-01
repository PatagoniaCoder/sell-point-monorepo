import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { BalanceService } from './balance.service';
import { BalanceCreateDto } from './dto/balance.dto';
import { BalanceEventPattern } from '@sell-point-balance-share/infrastructure/event.pattern';

@ApiTags('Balance')
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @EventPattern(BalanceEventPattern.ACCOUNT_CREATED)
  createBalance(payload: BalanceCreateDto): void {
    this.balanceService.createBalance(payload);
  }
}
