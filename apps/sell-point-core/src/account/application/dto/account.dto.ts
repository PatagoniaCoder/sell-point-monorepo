import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Operator, OrderTypes } from '../../domain/criteria';

class StringValueObjectDto {
  @IsString()
  value: string;
}

class FilterFieldDto extends StringValueObjectDto {}

class FilterOperatorDto {
  @IsEnum(Operator)
  value: Operator;
}

class FilterValueDto extends StringValueObjectDto {}

class FilterDto {
  @Type(() => FilterFieldDto)
  field: FilterFieldDto;

  @Type(() => FilterOperatorDto)
  operator: FilterOperatorDto;

  @Type(() => FilterValueDto)
  value: FilterValueDto;
}
class FiltersDto {
  @Type(() => FilterDto)
  filters: FilterDto[];
}

class OrderByDto extends StringValueObjectDto {}

class OrderTypesDto {
  @IsEnum(OrderTypes)
  value: OrderTypes;
}

class OrderDto {
  @Type(() => OrderByDto)
  orderBy: OrderByDto;

  @Type(() => OrderTypesDto)
  orderType: OrderTypesDto;
}

export class AccountDto {
  @ValidateNested({ each: true })
  @Type(() => FiltersDto)
  filters: FiltersDto;

  @Type(() => OrderDto)
  order: OrderDto;

  @IsNumber()
  limit?: number;

  @IsNumber()
  offset?: number;
}
