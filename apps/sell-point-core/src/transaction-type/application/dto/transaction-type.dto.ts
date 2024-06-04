import { OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsEnum, ValidateNested, IsNumber, IsUUID } from 'class-validator';
import { EntityTransactionType } from '../../domain/entity/entity-transaction-type';
import { EOperator, EOrderTypes } from '@sell-point-core-share/domain/criteria';

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

export class FilterTransactionTypeDto {
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

export class TransactionTypeResponseDto extends EntityTransactionType {
  @IsUUID()
  uuid: string;

  @IsString()
  description: string;

  @IsString()
  action: string;
}

export class TransactionTypeDto extends OmitType(TransactionTypeResponseDto, [
  'uuid',
] as const) {}
export class TransactionTypeUpdateDto extends PartialType(TransactionTypeResponseDto) {}
