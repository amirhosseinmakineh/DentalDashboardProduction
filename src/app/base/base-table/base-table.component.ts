import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { NgFor, NgIf, SlicePipe } from '@angular/common';

export interface TableAction { icon: string; label: string; onClick: (row: Record<string, unknown>) => void; }

@Component({
  selector: 'app-base-table',
  standalone: true,
  imports: [NgFor, NgIf, SlicePipe],
  template: `
    <section class="table-card">
      <div class="table-toolbar">
        <input class="control search" placeholder="جستجو..." (input)="search.set($any($event.target).value)" />
        <ng-content select="[filters]"></ng-content>
        <button class="btn primary" (click)="add.emit()">+ افزودن</button>
      </div>
      <div class="table-wrap"><table><thead><tr><th *ngFor="let c of columns">{{ c.label }}</th><th>عملیات</th></tr></thead>
        <tbody><tr *ngFor="let row of paged()"><td *ngFor="let c of columns">{{ row[c.key] }}</td><td class="actions">
          <button *ngIf="actions.edit" class="icon-btn" (click)="edit.emit(row)">✎</button>
          <button *ngIf="actions.delete" class="icon-btn danger" (click)="delete.emit(row)">🗑</button>
          <button *ngFor="let a of customActions" class="icon-btn" [title]="a.label" (click)="a.onClick(row)">{{ a.icon }}</button>
        </td></tr></tbody></table></div>
      <footer class="pagination"><button class="btn ghost" [disabled]="page()===1" (click)="page.set(page()-1)">قبلی</button><span>صفحه {{ page() }} از {{ pages() }}</span><button class="btn ghost" [disabled]="page()===pages()" (click)="page.set(page()+1)">بعدی</button></footer>
    </section>
  `
})
export class BaseTableComponent {
  @Input() columns: { key: string; label: string }[] = [];
  @Input() rows: Record<string, unknown>[] = [];
  @Input() actions = { edit: true, delete: true };
  @Input() customActions: TableAction[] = [];
  @Output() add = new EventEmitter<void>(); @Output() edit = new EventEmitter<Record<string, unknown>>(); @Output() delete = new EventEmitter<Record<string, unknown>>();
  search = signal(''); page = signal(1); pageSize = 5;
  filtered = computed(() => this.rows.filter(r => JSON.stringify(r).toLowerCase().includes(this.search().toLowerCase())));
  pages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize)));
  paged = computed(() => this.filtered().slice((this.page() - 1) * this.pageSize, this.page() * this.pageSize));
}
