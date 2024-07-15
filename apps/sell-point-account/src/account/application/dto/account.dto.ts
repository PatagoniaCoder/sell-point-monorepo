import { OmitType, PartialType } from '@nestjs/swagger';
import { EOperator, EOrderTypes } from '@sell-point-account-share/domain/criteria';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class StringValueObjectDto {
  @IsString()
  value: string = 'uuid';
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
  value: EOrderTypes = EOrderTypes.ASC;
}

class OrderDto {
  @Type(() => OrderByDto)
  orderBy: OrderByDto = new OrderByDto();

  @Type(() => OrderTypesDto)
  orderType: OrderTypesDto = new OrderTypesDto();
}

export class FilterAccountDto {
  @ValidateNested({ each: true })
  @Type(() => FiltersDto)
  filters: FiltersDto;

  @Type(() => OrderDto)
  @IsOptional()
  order?: OrderDto = new OrderDto();

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(50)
  @IsOptional()
  offset?: number;
}

export class AllAccountsDto extends OmitType(FilterAccountDto, ['filters'] as const) {}
class AccountCreateDto {
  @IsString()
  accountNumber: string;

  @IsString()
  description: string;
}

export class AccountCreateMessage {
  @IsString()
  key: string;

  @IsObject()
  @ValidateNested()
  @Type(() => AccountCreateDto)
  value: AccountCreateDto;
}

export class BalanceCreatedDto {
  @IsString()
  key: string;
  @IsObject()
  value: { accountUuid: string };
}

export class AccountUpdateDto extends PartialType(AccountCreateMessage) {}

export class ResponseMessage {
  @IsString()
  key: string;

  @IsObject()
  value: any;
}
