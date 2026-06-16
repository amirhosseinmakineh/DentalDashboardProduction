import {
  Directive,
  signal,
  computed
} from '@angular/core';
import { IPaginatedResult } from '../models/iPaginatedResult';
@Directive()
export abstract class BaseTableComponent<T> {

  loading = signal(false);

  data = signal<IPaginatedResult<T>>({
    items: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    hasPrevious: false,
    hasNext: false
  });

  search = signal('');

  pageNumber = signal(1);

  pageSize = signal(10);

  totalCount = computed(
    () => this.data().totalCount
  );

  items = computed(
    () => this.data().items
  );

  abstract loadData(): void;

  nextPage() {

    if (!this.data().hasNext) {
      return;
    }

    this.pageNumber.update(x => x + 1);

    this.loadData();
  }

  previousPage() {

    if (!this.data().hasPrevious) {
      return;
    }

    this.pageNumber.update(x => x - 1);

    this.loadData();
  }

  changePageSize(size: number) {

    this.pageSize.set(size);

    this.pageNumber.set(1);

    this.loadData();
  }

  refresh() {
    this.loadData();
  }
}
