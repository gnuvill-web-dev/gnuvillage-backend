import { IsOptional, IsString } from 'class-validator';

export class PageRequest {
  @IsString()
  @IsOptional()
  pageNo?: number | 1;

  @IsString()
  @IsOptional()
  pageSize?: number | 10; //  front 에서 쓰는 값

  getOffset(): number {
    //offset
    if (this.pageNo < 1 || this.pageNo === null || this.pageNo === undefined) {
      this.pageNo = 1;
    }

    if (
      this.pageSize < 1 ||
      this.pageSize === null ||
      this.pageSize === undefined
    ) {
      this.pageSize = 10;
    }

    return (Number(this.pageNo) - 1) * Number(this.pageSize);
  }

  getLimit(): number {
    // 한도
    if (
      this.pageSize < 1 ||
      this.pageSize === null ||
      this.pageSize === undefined
    ) {
      this.pageSize = 10;
    }
    return Number(this.pageSize);
  }
}

export class Page<T> {
  //pages 와일드 카드
  pageSize: number;
  totalCount: number;
  totalPage: number;
  items: T[];
  constructor(totalCount: number, pageSize: number, items: T[]) {
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / pageSize);
    this.items = items;
  }
}
