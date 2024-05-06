enum EOrder {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}
/* export class Criteria2<T> {
  readonly filters: li<T>;
  readonly order: EOrder;
  readonly limit?: number;
  readonly offset?: number;

  constructor(filters: li<T>, order: EOrder, limit?: number, offset?: number) {
    this.filters = filters;
    this.order = order;
    this.limit = limit;
    this.offset = offset;
  }
} */
//Folder Criteria

//Folder ValueObject
export abstract class EnumValueObject<T> {
  readonly value: T;

  constructor(
    value: T,
    public readonly validValues: T[],
  ) {
    this.value = value;
    this.checkValueIsValid(value);
  }

  public checkValueIsValid(value: T): void {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }

  protected abstract throwErrorForInvalidValue(value: T): void;
}
export abstract class StringValueObject {
  constructor(protected _value: string) {}

  public value(): string {
    return this._value;
  }
}

export enum OrderTypes {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}

//Extendemos y ahora OrderTypes pasa a ser T
export class OrderType extends EnumValueObject<OrderTypes> {
  constructor(value: OrderTypes) {
    super(value, Object.values(OrderTypes));
  }

  //Esto es simplemente otra forma de instanciar nuestra clase
  //La usamos cuando queremos hacer logica extra en nuestra instanciación
  //En este caso nosotro queremos evaluar que el campo value sea del tipo enum OrderTypes
  public static fromValue(value: string): OrderType {
    for (const orderTypeValue of Object.values(OrderTypes)) {
      if (value === orderTypeValue.toString()) {
        return new OrderType(orderTypeValue);
      }
    }

    throw new Error(`The order type ${value} is invalid`);
  }

  //Una vez instanciado podemos acceder a nuestros metodos que no son staticos

  //isNone() y isAsc() son encapsulaciones de condicionales, ambas retornan un booleano
  public isNone(): boolean {
    return this.value === OrderTypes.NONE;
  }

  public isAsc(): boolean {
    return this.value === OrderTypes.ASC;
  }

  //Contrato definido en EnumValueObject
  protected throwErrorForInvalidValue(value: OrderTypes): void {
    throw new Error(`The order type ${value} is invalid`);
  }
}

export class OrderBy extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}

export class Order {
  readonly orderBy: OrderBy;
  readonly orderType: OrderType;

  constructor(orderBy: OrderBy, orderType: OrderType) {
    this.orderBy = orderBy;
    this.orderType = orderType;
  }

  //Esto es simplemente otra forma de instanciar nuestra clase
  //La usamos cuando queremos hacer logica extra en nuestra instanciación
  public static fromValues(orderBy?: string, orderType?: string): Order {
    if (!orderBy) {
      return new Order(new OrderBy(''), new OrderType(OrderTypes.NONE));
    }

    return new Order(new OrderBy(orderBy), OrderType.fromValue(orderType || OrderTypes.ASC));
  }

  //Confirmamos que order sea acendente o decendente
  public hasOrder() {
    return !this.orderType.isNone();
  }
}

export class FilterValue extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}

export class FilterField extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}

export enum Operator {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GT = '>',
  LT = '<',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS',
}

export class FilterOperator extends EnumValueObject<Operator> {
  constructor(value: Operator) {
    super(value, Object.values(Operator));
  }

  //Esto es simplemente otra forma de instanciar nuestra clase
  //La usamos cuando queremos hacer logica extra en nuestra instanciación
  public static fromValue(value: string): FilterOperator {
    for (const operatorValue of Object.values(Operator)) {
      if (value === operatorValue.toString()) {
        return new FilterOperator(operatorValue);
      }
    }

    throw new Error(`The filter operator ${value} is invalid`);
  }

  //Condicional que evalua si mi operador es positivo
  public isPositive(): boolean {
    return this.value !== Operator.NOT_EQUAL && this.value !== Operator.NOT_CONTAINS;
  }

  //Implementación de nuestro EnumValueObject
  protected throwErrorForInvalidValue(value: Operator): void {
    throw new Error(`The filter operator ${value} is invalid`);
  }

  //Instancio la clase con el operador =
  public static equal() {
    return this.fromValue(Operator.EQUAL);
  }
}

export class Filter {
  readonly field: FilterField;
  readonly operator: FilterOperator;
  readonly value: FilterValue;

  constructor(field: FilterField, operator: FilterOperator, value: FilterValue) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }

  //Esto es simplemente otra forma de instanciar nuestra clase
  //La usamos cuando queremos hacer logica extra en nuestra instanciación
  public static fromValues(values: Map<string, string>): Filter {
    const field = values.get('field');
    const operator = values.get('operator');
    const value = values.get('value');

    if (!field || !operator || !value) {
      throw new Error(`The filter is invalid`);
    }

    return new Filter(
      new FilterField(field),
      FilterOperator.fromValue(operator),
      new FilterValue(value),
    );
  }
}

export class Filters {
  public readonly filters: Filter[];

  constructor(filters: Filter[]) {
    this.filters = filters;
  }

  //Esto es simplemente otra forma de instanciar nuestra clase
  //La usamos cuando queremos hacer logica extra en nuestra instanciación
  public static fromValues(filters: Array<Map<string, string>>): Filters {
    return new Filters(filters.map(Filter.fromValues));
  }

  public static none(): Filters {
    return new Filters([]);
  }
}

export class Criteria {
  readonly filters: Filters;
  readonly order: Order;
  readonly limit?: number;
  readonly offset?: number;

  constructor(filters: Filters, order: Order, limit?: number, offset?: number) {
    this.filters = filters;
    this.order = order;
    this.limit = limit;
    this.offset = offset;
  }

  public hasFilters(): boolean {
    return this.filters.filters.length > 0;
  }
}
