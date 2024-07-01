import { PartialType } from '@nestjs/swagger';
import { EOperator, EOrderTypes } from '@sell-point-account-share/domain/criteria';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';

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
