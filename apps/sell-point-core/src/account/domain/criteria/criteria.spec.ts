import { Criteria } from './criteria';

describe('Criteria', () => {
  it('should be defined', () => {
    expect(new Criteria(null, null)).toBeDefined();
  });
});
