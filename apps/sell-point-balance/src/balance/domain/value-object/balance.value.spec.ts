import { BalanceValue } from './balance.value';

describe('BalanceValue', () => {
  it('should be defined', () => {
    expect(new BalanceValue('accountUuid', 0, 1, 1)).toBeDefined();
  });
});
