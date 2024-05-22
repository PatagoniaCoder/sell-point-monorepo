import { Type } from 'class-transformer';
import { IsString, IsEnum, ValidateNested, IsNumber, IsUUID } from 'class-validator';
import { EOperator, EOrderTypes } from '../../domain/criteria';
import { BalanceEntity } from '../../domain/entity/balance-entity.interface';
import { OmitType, PartialType } from '@nestjs/swagger';

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

export class FilterBalanceDto {
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

export class BalanceResponseDto extends BalanceEntity {
  @IsUUID()
  uuid: string;

  @IsString()
  accountUuid: string;

  @IsNumber()
  amount: number;

  @IsString()
  lastTransactionUuid: string;
}

export class BalanceDto extends OmitType(BalanceResponseDto, ['uuid'] as const) {}
export class BalanceUpdateDto extends PartialType(BalanceResponseDto) {}
