import { OmitType, PartialType } from '@nestjs/swagger';
import { AccountResponseDto } from '../../../account/application/dto/account.dto';
import { TransactionTypeResponseDto } from '../../../transaction-type/application/dto/transaction-type.dto';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';
import { EOperator, EOrderTypes } from '../../domain/criteria';
import { TransactionEntity } from '../../domain/entity/transaction-entity.interface';

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

export class TransactionResponseDto extends TransactionEntity {
  @IsUUID()
  uuid: string;

  @IsDate()
  transactionDate: Date;

  @ValidateNested({ each: true })
  @Type(() => TransactionTypeResponseDto)
  transactionType: TransactionTypeResponseDto;

  @ValidateNested({ each: true })
  @Type(() => AccountResponseDto)
  transactionAccountFrom: AccountResponseDto;

  @ValidateNested({ each: true })
  @Type(() => AccountResponseDto)
  transactionAccountTo: AccountResponseDto;

  @IsNumber()
  transactionAmount: number;

  @IsNumber()
  transactionAmountBefore: number;

  @IsNumber()
  transactionAmountAfter: number;
}

export class TransactionDto extends OmitType(TransactionResponseDto, [
  'uuid',
  'transactionDate',
  'transactionAmountAfter',
  'transactionAmountBefore',
] as const) {}
export class TransactionUpdateDto extends PartialType(TransactionResponseDto) {}
