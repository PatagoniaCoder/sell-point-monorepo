import { Operator } from './enum-operator';
import { FilterOperator } from './filter-operator';

describe('FilterOperator', () => {
  it('should be defined', () => {
    expect(new FilterOperator(Operator.EQUAL)).toBeDefined();
  });

  it('should return a instance with EQUAL operator', () => {
    const filterOperator = FilterOperator.equal();
    expect(filterOperator.value).toBe(Operator.EQUAL);
  });

  it('should throw error on invalid operator', () => {
    try {
      FilterOperator.fromValue('any');
    } catch (error) {
      expect(error.message).toBe('The filter operator any is invalid');
    }
  });

  describe('should return an Instance from the string value', () => {
    it('should return an Instance with EQUAL operator from "=" string', () => {
      const filterOperator = FilterOperator.fromValue('=');
      expect(filterOperator.value).toBe(Operator.EQUAL);
    });

    it('should return an Instance with CONTAINS operator from "CONTAINS" string', () => {
      const filterOperator = FilterOperator.fromValue('CONTAINS');
      expect(filterOperator.value).toBe(Operator.CONTAINS);
    });

    it('should return an Instance with GT operator from ">" string', () => {
      const filterOperator = FilterOperator.fromValue('>');
      expect(filterOperator.value).toBe(Operator.GT);
    });

    it('should return an Instance with LT operator from "<" string', () => {
      const filterOperator = FilterOperator.fromValue('<');
      expect(filterOperator.value).toBe(Operator.LT);
    });

    it('should return an Instance with NOT_CONTAINS operator from "NOT_CONTAINS" string', () => {
      const filterOperator = FilterOperator.fromValue('NOT_CONTAINS');
      expect(filterOperator.value).toBe(Operator.NOT_CONTAINS);
    });

    it('should return an Instance with NOT_EQUAL operator from "!=" string', () => {
      const filterOperator = FilterOperator.fromValue('!=');
      expect(filterOperator.value).toBe(Operator.NOT_EQUAL);
    });
  });
  describe('should be positive', () => {
    it('Operator.EQUAL', () => {
      const operator = new FilterOperator(Operator.EQUAL);
      expect(operator.isPositive()).toBeTruthy();
    });

    it('Operator.CONTAINS', () => {
      const operator = new FilterOperator(Operator.CONTAINS);
      expect(operator.isPositive()).toBeTruthy();
    });

    it('Operator.GT', () => {
      const operator = new FilterOperator(Operator.GT);
      expect(operator.isPositive()).toBeTruthy();
    });

    it('Operator.LT', () => {
      const operator = new FilterOperator(Operator.LT);
      expect(operator.isPositive()).toBeTruthy();
    });
  });

  describe('should be negative', () => {
    it('Operator.NOT_EQUAL', () => {
      const operator = new FilterOperator(Operator.NOT_EQUAL);
      expect(operator.isPositive()).toBeFalsy();
    });

    it('Operator.NOT_CONTAINS', () => {
      const operator = new FilterOperator(Operator.NOT_CONTAINS);
      expect(operator.isPositive()).toBeFalsy();
    });
  });
});
