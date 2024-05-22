import { BalanceValue } from './balance-value';

describe('BalanceValue', () => {
  it('should be defined', () => {
    expect(new BalanceValue(null, null, null)).toBeDefined();
  });
});
