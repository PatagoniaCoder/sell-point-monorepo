import { AccountValue } from './account.value';

describe('AccountValue', () => {
  it('should be defined', () => {
    expect(new AccountValue('accountNumber', 'description', 'key')).toBeDefined();
  });
});
