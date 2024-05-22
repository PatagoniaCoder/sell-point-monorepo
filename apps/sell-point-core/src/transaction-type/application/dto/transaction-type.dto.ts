import { OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsEnum, ValidateNested, IsNumber, IsUUID } from 'class-validator';
import { EOperator, EOrderTypes } from '../../domain/criteria';
import { TransactionTypeEntity } from '../../domain/entity/transaction-type-entity.interface';

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

export class TransactionTypeResponseDto extends TransactionTypeEntity {
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
