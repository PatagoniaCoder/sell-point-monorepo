import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { OrderTypes } from '../../domain/criteria/criteria';

class StringValueObjectDto {
  @IsString()
  _value: string;
}

class OrderTypesDto {
  @IsEnum(OrderTypes)
  _value: OrderTypes;
}

class FilterFieldDto extends StringValueObjectDto {}

class FilterOperatorDto extends StringValueObjectDto {}

class FilterValueDto extends StringValueObjectDto {}

class FilterDto {
  @Type(() => FilterFieldDto)
  field: FilterFieldDto;

  @Type(() => FilterOperatorDto)
  operator: FilterOperatorDto;

  @Type(() => FilterValueDto)
  value: FilterValueDto;
}

class OrderByDto extends StringValueObjectDto {}

class OrderDto {
  @Type(() => OrderByDto)
  orderBy: OrderByDto;

  @Type(() => OrderTypesDto)
  orderType: OrderTypesDto;
}

export class AccountDto {
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  filters: FilterDto[];

  @Type(() => OrderDto)
  order: OrderDto;

  @IsNumber()
  limit?: number;

  @IsNumber()
  offset?: number;
}
