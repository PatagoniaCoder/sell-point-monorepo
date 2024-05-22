import { TransactionValue } from './transaction-value';

describe('TransactionValue', () => {
  it('should be defined', () => {
    expect(new TransactionValue(null, null, null, null)).toBeDefined();
  });
});
