import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Criteria, Filters, Order } from '@sell-point-core-share/domain/criteria';
import { EFilter } from '@sell-point-core-share/domain/criteria/enum-filter';
import { catchError, firstValueFrom, timeout } from 'rxjs';
import { EntityAccount } from '../domain/entity/entity-account';
import { CreateAccountEvent } from '../domain/events/create-account.events';
import { AccountRepository } from '../domain/repository/account.repository.interface';
import { AccountValue } from '../domain/value-object/account.value';
import { AccountEventPattern } from '../shared/event.pattern';
import {
  AccountCreateDto,
  AccountUpdateDto,
  FilterAccountDto,
  ResponseMessage,
} from './dto/account.dto';

@Injectable()
export class AccountService implements OnModuleInit {
  constructor(
    @Inject('ACCOUNT_SERVICE') private readonly accountMicroService: ClientKafka,
    private readonly accountRepository: AccountRepository,
  ) {}
  readonly logger = new Logger(AccountService.name);

  async onModuleInit() {
    Object.values(AccountEventPattern).forEach((key) =>
      this.accountMicroService.subscribeToResponseOf(key),
    );
    await this.accountMicroService.connect();
  }

  async createAccount(account: AccountCreateDto): Promise<ResponseMessage> {
    const { accountNumber, description } = account;
    const newAccount = new AccountValue(accountNumber, description);
    return await firstValueFrom(
      this.accountMicroService
        .send(AccountEventPattern.CREATE, new CreateAccountEvent(newAccount).toString())
        .pipe(
          timeout(5000),
          catchError((err) => {
            this.logger.error({ ...err });
            throw new HttpException('Cant create an account', HttpStatus.BAD_REQUEST);
          }),
        ),
    );
  }

  async deleteAccount(uuid: string): Promise<void> {
    await this.accountRepository.deleteAccount(uuid).catch((err) => {
      throw new Error(err.message);
    });
  }

  async updateAccount(uuid: string, values: AccountUpdateDto): Promise<EntityAccount> {
    return await this.accountRepository.updateAccount(uuid, values);
  }

  async findByCriteria(filterAccount: FilterAccountDto): Promise<EntityAccount[]> {
    const { filters, order, offset, limit } = filterAccount;
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
      Order.fromValues(order.orderBy.value, order.orderType.value),
      limit,
      offset,
    );

    return await this.accountRepository.findByCriteria(criteria);
  }

  async findAll(): Promise<EntityAccount[]> {
    return await firstValueFrom(this.accountMicroService.send('account.findAll', {}));
  }
}
