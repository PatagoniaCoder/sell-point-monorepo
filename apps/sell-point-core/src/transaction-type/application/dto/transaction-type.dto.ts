import { OmitType, PartialType } from '@nestjs/swagger';
import { EOperator, EOrderTypes } from '@sell-point-core-share/domain/criteria';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { EntityTransactionType } from '../../domain/entity/entity-transaction-type';

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

class OrderByDto extends StringValueObjectDto {}

class OrderTypesDto {
  @IsEnum(EOrderTypes)
  value: EOrderTypes;
}

class OrderDto {
  @Type(() => OrderByDto)
  @IsOptional()
  orderBy?: OrderByDto = new OrderByDto();

  @Type(() => OrderTypesDto)
  @IsOptional()
  orderType?: OrderTypesDto = new OrderTypesDto();
}

export class FilterTransactionTypeDto {
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  filters: FilterDto[];

  @Type(() => OrderDto)
  @IsOptional()
  order?: OrderDto = new OrderDto();

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  limit?: number = 20;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  offset?: number = 0;
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
