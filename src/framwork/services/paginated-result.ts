import { IPaginatedResult } from '../models/iPaginatedResult';

export class PaginatedResult<T> implements IPaginatedResult<T> {
  items: T[] = [];
  totalCount = 0;
  pageNumber = 1;
  pageSize = 10;

  constructor(init?: Partial<PaginatedResult<T>>) {
    Object.assign(this, init);
  }

  get totalPages(): number {
    return this.pageSize <= 0
      ? 0
      : Math.ceil(this.totalCount / this.pageSize);
  }

  get hasPrevious(): boolean {
    return this.pageNumber > 1;
  }

  get hasNext(): boolean {
    return this.pageNumber < this.totalPages;
  }
}
