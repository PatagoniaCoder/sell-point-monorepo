import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { catchError, defer, retry, throwError } from 'rxjs';
import { BalanceRepository } from '../domain/repository/balance.repository';
import { BalanceValue } from '../domain/value-object/balance.value';
import { BalanceCreateDto } from './dto/balance.dto';
import { BalanceEventPattern } from '@sell-point-balance-share/infrastructure/event.pattern';

@Injectable()
export class BalanceService {
  constructor(
    @Inject('ACCOUNT_SERVICE') private readonly accountClient: ClientKafka,
    private readonly balanceRepository: BalanceRepository,
  ) {}

  readonly logger = new Logger(BalanceService.name);

  createBalance(payload: BalanceCreateDto): void {
    const { value, key } = payload;
    const newBalance = new BalanceValue(value.accountUuid, 0, 0, 0);
    const balance$ = defer(() => this.balanceRepository.createBalance(newBalance)).pipe(
      catchError((err) => {
        return throwError(() => err);
      }),
      retry({ count: 5, delay: 5000 }),
    );
    balance$.subscribe({
      next: () =>
        this.accountClient.emit(BalanceEventPattern.CREATE_SUCCESS, {
          key: key,
          value,
        }),
      error: (err) => {
        this.logger.error({ ...err });
        this.accountClient.emit(BalanceEventPattern.CREATE_FAIL, {
          key: key,
          value,
        });
      },
    });
  }

  async deleteBalance(uuid: string): Promise<void> {
    await this.balanceRepository.deleteBalance(uuid).catch((err) => {
      throw new Error(err.message);
    });
  }
  /* 
  async updateBalance(uuid: string, values: BalanceUpdateDto): Promise<EntityBalance> {
    const { accountUuid, amount } = values;
    const balance = await this.balanceRepository.findByUuid(uuid);
    const balanceAmountBefore = balance.amount;
    const balanceAmountAfter = balance.balanceAmountAfter;
    const updatedBalance = {
      accountUuid,
      balanceAmountBefore,
      balanceAmountAfter: balanceAmountAfter + amount,
      amount: balanceAmountAfter + amount,
    };
    return await this.balanceRepository.updateBalance(uuid, updatedBalance);
  }

  async findAllByCriteria(filterBalance: FilterBalanceDto): Promise<EntityBalance[]> {
    const { filters, order, offset, limit } = filterBalance;
    const mapFilters = filters.filters.map(
      (filter) =>
        new Map([
          [EFilter.FIELD, filter.field.value],
          [EFilter.OPERATOR, filter.operator.value],
          [EFilter.VALUE, filter.value.value],
        ]),
    );
    const criteria = new Criteria(
      Filters.fromValues(mapFilters),
      Order.fromValues(order.orderBy?.value, order.orderType?.value),
      limit,
      offset,
    );

    return await this.balanceRepository.findAllByCriteria(criteria);
  }

  async findAll(): Promise<EntityBalance[]> {
    return await this.balanceRepository.findAllBalances();
  }

  async updateBalanceEvent(values: BalanceCreateDto): Promise<void> {
    const criteria = new Criteria(
      Filters.fromValues([
        new Map([
          [EFilter.FIELD, 'accountUuid'],
          [EFilter.OPERATOR, '='],
          [EFilter.VALUE, values.accountUuid],
        ]),
      ]),
      Order.fromValues(),
    );
    const balance = await this.balanceRepository.findOneByCriteria(criteria);
    await this.updateBalance(balance.uuid, values);
  } */
}
