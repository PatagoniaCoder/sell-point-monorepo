import { TransactionTypeValue } from './transaction-type-value';

describe('TransactionTypeValue', () => {
  it('should be defined', () => {
    expect(new TransactionTypeValue('description', 'action')).toBeDefined();
  });
});
