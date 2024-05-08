import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Operator, OrderTypes } from '../../domain/criteria';
import { AccountEntity } from '../../domain/entity/account.entity.interface';

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

export class FilterAccountDto {
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

export class AccountResponseDto implements AccountEntity {
  @IsUUID()
  uuid: string;
  @IsString()
  accountNumber: string;
  @IsString()
  description: string;
}
