import { Criteria } from '@sell-point-core-share/domain/criteria';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export interface PageMetaDtoParameters {
  pageOptionsDto: Criteria;
  itemCount: number;
}

export class PageMetaDto {
  readonly offset: number;
  readonly take: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.offset = pageOptionsDto.offset;
    this.take = pageOptionsDto.limit;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.offset > 1;
    this.hasNextPage = this.offset < this.pageCount;
  }
}

export class PageDto<T> {
  @IsArray()
  @ValidateNested({ each: true })
  readonly data: T[];

  @Type(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
  toString() {
    return JSON.stringify({ data: this.data, meta: this.meta });
  }
}
