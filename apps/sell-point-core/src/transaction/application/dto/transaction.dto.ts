import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';
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

export class FilterTransactionDto {
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

export class TransactionCreateDto {
  @IsUUID()
  transactionTypeUuid: string;
  @IsUUID()
  transactionAccountFromUuid: string;
  @IsUUID()
  transactionAccountToUuid: string;
  @IsNumber()
  transactionAmount: number;
}
export class TransactionUpdateDto extends PartialType(TransactionCreateDto) {}
