export abstract class BalanceEntity {
  uuid: string;
  accountUuid: string;
  amount: number;
  lastTransactionUuid: string;
}
