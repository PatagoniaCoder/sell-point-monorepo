export enum AccountEventPattern {
  FILTER = 'account.filter',
  FIND_ALL = 'account.findAll',
  CREATE = 'account.create',
  DELETE = 'account.delete',
  UPDATE = 'account.update',
}

export enum BalanceEventPattern {
  CREATE_SUCCESS = 'balance.created.success',
  CREATE_FAIL = 'balance.created.error',
  ACCOUNT_CREATED = 'balance.account.created',
}
