import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { EOperator, EOrderTypes } from '../../domain/criteria';

class StringValueObjectDto {
  @IsString()
  value: string;
}

class FilterFieldDto extends StringValueObjectDto {}

class FilterOperatorDto {
  @IsEnum(EOperator)
  value: EOperator;
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
  @IsEnum(EOrderTypes)
  value: EOrderTypes;
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

export class AccountCreateDto {
  @IsString()
  accountNumber: string;

  @IsString()
  description: string;
}

export class AccountUpdateDto extends PartialType(AccountCreateDto) {}
