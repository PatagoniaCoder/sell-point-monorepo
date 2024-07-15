import { OmitType, PartialType } from '@nestjs/swagger';
import { EOperator, EOrderTypes } from '@sell-point-core-share/domain/criteria';
import { EntityAccount } from '@sell-point-core/account/domain/entity/entity-account';
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
  value: string = 'id';
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
  value: EOrderTypes = EOrderTypes.ASC;
}

class OrderDto {
  @Type(() => OrderByDto)
  @IsOptional()
  orderBy?: OrderByDto = new OrderByDto();

  @Type(() => OrderTypesDto)
  @IsOptional()
  orderType?: OrderTypesDto = new OrderTypesDto();
}

export class FilterAccountDto {
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

export class AllAccountsDto extends OmitType(FilterAccountDto, ['filters'] as const) {}
export class AccountCreateDto {
  @IsString()
  accountNumber: string;

  @IsString()
  description: string;
}

export class AccountUpdateDto extends PartialType(AccountCreateDto) {}

export class ResponseMessage {
  @IsString()
  key: string;

  @IsObject()
  @ValidateNested()
  @Type(() => EntityAccount)
  value: EntityAccount;
}
