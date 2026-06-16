import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { ITableColumn } from '../../models/iTableColumn';
import { ITableAction } from '../../models/iTableAction';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tableComponent.component.html',
  styleUrls: ['./tableComponent.component.css']
})
export class TableComponent<T> implements OnChanges {

  @Input() title = 'لیست اطلاعات';
  @Input() description = 'مدیریت و عملیات روی اطلاعات سیستم';

  @Input() data: T[] = [];
  @Input() columns: ITableColumn[] = [];

  @Input() loading = false;

  @Input() totalCount = 0;
  @Input() pageNumber = 1;
  @Input() pageSize = 10;

  @Input() showSearch = true;
  @Input() showCreate = true;
  @Input() showEdit = true;
  @Input() showDelete = true;
  @Input() showActions = true;

  @Input() customActions: ITableAction[] = [];

  @Output() pageChange = new EventEmitter<number>();
  @Output() search = new EventEmitter<string>();
  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  @Output() customAction = new EventEmitter<{
    action: ITableAction;
    row: T;
  }>();

  safeData: T[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.safeData = Array.isArray(this.data) ? [...this.data] : [];
      console.log('TABLE SAFE DATA:', this.safeData);
    }
  }

  get totalPages(): number {
    if (!this.pageSize || this.totalCount <= 0) return 1;
    return Math.ceil(this.totalCount / this.pageSize);
  }

  get startItem(): number {
    if (this.totalCount === 0) return 0;
    return (this.pageNumber - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    if (this.totalCount === 0) return 0;
    return Math.min(this.pageNumber * this.pageSize, this.totalCount);
  }

  get hasPrevious(): boolean {
    return this.pageNumber > 1;
  }

  get hasNext(): boolean {
    return this.pageNumber < this.totalPages;
  }

  get hasActions(): boolean {
    return this.showActions && (this.showEdit || this.showDelete || this.customActions.length > 0);
  }

  get colspan(): number {
    return this.columns.length + (this.hasActions ? 1 : 0);
  }

  getValue(item: T, key: string): unknown {
    return (item as Record<string, unknown>)?.[key] ?? '-';
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim();
    this.search.emit(value);
  }

  onCreate(): void {
    console.log('TABLE CREATE CLICKED');
    this.create.emit();
  }

  onEdit(item: T): void {
    console.log('TABLE EDIT CLICKED', item);
    this.edit.emit(item);
  }

  onDelete(item: T): void {
    console.log('TABLE DELETE CLICKED', item);
    this.delete.emit(item);
  }

  onCustomAction(action: ITableAction, row: T): void {
    this.customAction.emit({ action, row });
  }

  previousPage(): void {
    if (!this.hasPrevious || this.loading) return;
    this.pageChange.emit(this.pageNumber - 1);
  }

  nextPage(): void {
    if (!this.hasNext || this.loading) return;
    this.pageChange.emit(this.pageNumber + 1);
  }
}
