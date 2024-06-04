import { EOperator } from './enum-operator';
import { FilterOperator } from './filter-operator';

describe('FilterOperator', () => {
  it('should be defined', () => {
    expect(new FilterOperator(EOperator.EQUAL)).toBeDefined();
  });

  it('should return a instance with EQUAL operator', () => {
    const filterOperator = FilterOperator.equal();
    expect(filterOperator.value).toBe(EOperator.EQUAL);
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
      expect(filterOperator.value).toBe(EOperator.EQUAL);
    });

    it('should return an Instance with CONTAINS operator from "CONTAINS" string', () => {
      const filterOperator = FilterOperator.fromValue('CONTAINS');
      expect(filterOperator.value).toBe(EOperator.CONTAINS);
    });

    it('should return an Instance with GT operator from ">" string', () => {
      const filterOperator = FilterOperator.fromValue('>');
      expect(filterOperator.value).toBe(EOperator.GT);
    });

    it('should return an Instance with LT operator from "<" string', () => {
      const filterOperator = FilterOperator.fromValue('<');
      expect(filterOperator.value).toBe(EOperator.LT);
    });

    it('should return an Instance with NOT_CONTAINS operator from "NOT_CONTAINS" string', () => {
      const filterOperator = FilterOperator.fromValue('NOT_CONTAINS');
      expect(filterOperator.value).toBe(EOperator.NOT_CONTAINS);
    });

    it('should return an Instance with NOT_EQUAL operator from "!=" string', () => {
      const filterOperator = FilterOperator.fromValue('!=');
      expect(filterOperator.value).toBe(EOperator.NOT_EQUAL);
    });
  });
  describe('should be positive', () => {
    it('Operator.EQUAL', () => {
      const operator = new FilterOperator(EOperator.EQUAL);
      expect(operator.isPositive()).toBeTruthy();
    });

    it('Operator.CONTAINS', () => {
      const operator = new FilterOperator(EOperator.CONTAINS);
      expect(operator.isPositive()).toBeTruthy();
    });

    it('Operator.GT', () => {
      const operator = new FilterOperator(EOperator.GT);
      expect(operator.isPositive()).toBeTruthy();
    });

    it('Operator.LT', () => {
      const operator = new FilterOperator(EOperator.LT);
      expect(operator.isPositive()).toBeTruthy();
    });
  });

  describe('should be negative', () => {
    it('Operator.NOT_EQUAL', () => {
      const operator = new FilterOperator(EOperator.NOT_EQUAL);
      expect(operator.isPositive()).toBeFalsy();
    });

    it('Operator.NOT_CONTAINS', () => {
      const operator = new FilterOperator(EOperator.NOT_CONTAINS);
      expect(operator.isPositive()).toBeFalsy();
    });
  });
});
