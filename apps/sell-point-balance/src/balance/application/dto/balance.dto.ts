import { PartialType } from '@nestjs/swagger';
import { EOperator, EOrderTypes } from '@sell-point-balance-share/domain/criteria';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';

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
  @ValidateNested()
  @Type(() => OrderByDto)
  orderBy: OrderByDto;

  @ValidateNested()
  @Type(() => OrderTypesDto)
  orderType: OrderTypesDto;
}

export class FilterBalanceDto {
  @ValidateNested()
  @Type(() => FiltersDto)
  filters: FiltersDto;

  @ValidateNested()
  @Type(() => OrderDto)
  order: OrderDto;

  @IsNumber()
  limit?: number;

  @IsNumber()
  offset?: number;
}

export class BalanceCreateDto {
  @IsUUID()
  accountUuid: string;

  @IsNumber()
  amount: number;
}

export class BalanceUpdateDto extends PartialType(BalanceCreateDto) {}
