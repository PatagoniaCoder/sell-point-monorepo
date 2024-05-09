import { Equal, Not, MoreThan, LessThan, Like } from 'typeorm';
import { Criteria, Filters, Order } from '../../../domain/criteria';
import { MySqlCriteriaConverter } from './mysql-criteria-convertor';
import { EFilter } from '../../../domain/criteria/enum-filter';

describe('MySqlCriteriaConverter', () => {
  it('should be defined', () => {
    expect(new MySqlCriteriaConverter()).toBeDefined();
  });

  describe('should convert to mysql form', () => {
    const filter = { field: 'uuid', operator: 'CONTAINS', value: 'string' };
    const orderValue = 'asc';

    it('should return equal query', () => {
      filter.operator = '=';
      const result = {
        filter: {
          where: {
            [filter.field]: Equal(filter.value),
          },
        },
        limit: 0,
        order: { [filter.field]: orderValue },
        skip: 0,
      };
      const order = Order.fromValues(filter.field, orderValue);
      const map = new Map([
        [EFilter.FIELD, filter.field],
        [EFilter.OPERATOR, filter.operator],
        [EFilter.VALUE, filter.value],
      ]);
      const filters = Filters.fromValues([map]);
      const criteria = new Criteria(filters, order);
      const mysqlConverter = new MySqlCriteriaConverter();
      const structure = mysqlConverter.convert(criteria);
      expect(structure).toMatchObject(result);
    });

    it('should return not equal query', () => {
      filter.operator = '!=';
      const result = {
        filter: {
          where: {
            [filter.field]: Not(Equal(filter.value)),
          },
        },
        limit: 0,
        order: { [filter.field]: orderValue },
        skip: 0,
      };
      const order = Order.fromValues(filter.field, orderValue);
      const map = new Map([
        [EFilter.FIELD, filter.field],
        [EFilter.OPERATOR, filter.operator],
        [EFilter.VALUE, filter.value],
      ]);
      const filters = Filters.fromValues([map]);
      const criteria = new Criteria(filters, order);
      const mysqlConverter = new MySqlCriteriaConverter();
      const structure = mysqlConverter.convert(criteria);
      expect(structure).toMatchObject(result);
    });

    it('should return greater than query', () => {
      filter.operator = '>';
      const result = {
        filter: {
          where: {
            [filter.field]: MoreThan(filter.value),
          },
        },
        limit: 0,
        order: { [filter.field]: orderValue },
        skip: 0,
      };
      const order = Order.fromValues(filter.field, orderValue);
      const map = new Map([
        [EFilter.FIELD, filter.field],
        [EFilter.OPERATOR, filter.operator],
        [EFilter.VALUE, filter.value],
      ]);
      const filters = Filters.fromValues([map]);
      const criteria = new Criteria(filters, order);
      const mysqlConverter = new MySqlCriteriaConverter();
      const structure = mysqlConverter.convert(criteria);
      expect(structure).toMatchObject(result);
    });

    it('should return lower than  query', () => {
      filter.operator = '<';
      const result = {
        filter: {
          where: {
            [filter.field]: LessThan(filter.value),
          },
        },
        limit: 0,
        order: { [filter.field]: orderValue },
        skip: 0,
      };
      const order = Order.fromValues(filter.field, orderValue);
      const map = new Map([
        [EFilter.FIELD, filter.field],
        [EFilter.OPERATOR, filter.operator],
        [EFilter.VALUE, filter.value],
      ]);
      const filters = Filters.fromValues([map]);
      const criteria = new Criteria(filters, order);
      const mysqlConverter = new MySqlCriteriaConverter();
      const structure = mysqlConverter.convert(criteria);
      expect(structure).toMatchObject(result);
    });

    it('should return contains query', () => {
      filter.operator = 'CONTAINS';
      const result = {
        filter: {
          where: {
            [filter.field]: Like(`%${filter.value}%`),
          },
        },
        limit: 0,
        order: { [filter.field]: orderValue },
        skip: 0,
      };
      const order = Order.fromValues(filter.field, orderValue);
      const map = new Map([
        [EFilter.FIELD, filter.field],
        [EFilter.OPERATOR, filter.operator],
        [EFilter.VALUE, filter.value],
      ]);
      const filters = Filters.fromValues([map]);
      const criteria = new Criteria(filters, order);
      const mysqlConverter = new MySqlCriteriaConverter();
      const structure = mysqlConverter.convert(criteria);
      expect(structure).toMatchObject(result);
    });

    it('should return not contains query', () => {
      filter.operator = 'NOT_CONTAINS';

      const result = {
        filter: {
          where: {
            [filter.field]: Not(Like(`%${filter.value}%`)),
          },
        },
        limit: 0,
        order: { [filter.field]: orderValue },
        skip: 0,
      };
      const order = Order.fromValues(filter.field, orderValue);
      const map = new Map([
        [EFilter.FIELD, filter.field],
        [EFilter.OPERATOR, filter.operator],
        [EFilter.VALUE, filter.value],
      ]);
      const filters = Filters.fromValues([map]);
      const criteria = new Criteria(filters, order);
      const mysqlConverter = new MySqlCriteriaConverter();
      const structure = mysqlConverter.convert(criteria);
      expect(structure).toMatchObject(result);
    });

    it('should return a query without order', () => {
      filter.operator = '=';
      const result = {
        filter: {
          where: {
            [filter.field]: Equal(filter.value),
          },
        },
        limit: 0,
        skip: 0,
      };
      const order = Order.fromValues(filter.field, 'none');
      const map = new Map([
        [EFilter.FIELD, filter.field],
        [EFilter.OPERATOR, filter.operator],
        [EFilter.VALUE, filter.value],
      ]);
      const filters = Filters.fromValues([map]);
      const criteria = new Criteria(filters, order);
      const mysqlConverter = new MySqlCriteriaConverter();
      const structure = mysqlConverter.convert(criteria);
      expect(structure).toMatchObject(result);
    });

    it('should return a query without filter', () => {
      filter.operator = '=';
      const result = {
        limit: 0,
        skip: 0,
      };
      const order = Order.fromValues(filter.field, 'none');
      const filters = Filters.none();
      const criteria = new Criteria(filters, order);
      const mysqlConverter = new MySqlCriteriaConverter();
      const structure = mysqlConverter.convert(criteria);
      expect(structure).toMatchObject(result);
    });
  });
});
