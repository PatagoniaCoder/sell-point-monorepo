import { EntityTransactionType } from '@sell-point-transaction-type/domain/entity/entity-transaction-type';
import { TransactionValue } from './transaction-value';

describe('TransactionValue', () => {
  it('should be defined', () => {
    expect(
      new TransactionValue({ action: 'in' } as EntityTransactionType, null, null),
    ).toBeDefined();
  });
});
