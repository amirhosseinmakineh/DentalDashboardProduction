import { Component, EventEmitter, Input, Output, computed, inject, signal } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { FilterConfig, FilterValues, BaseFilterPanelComponent } from '../base-filter-panel/base-filter-panel.component';
import { BaseToastService } from '../base-toast/base-toast.service';

export interface TableAction { icon: string; label: string; onClick: (row: Record<string, unknown>) => void; }

@Component({
  selector: 'app-base-table',
  standalone: true,
  imports: [NgFor, NgIf, NgTemplateOutlet, BaseFilterPanelComponent],
  template: `
    <section class="table-card">
      <div class="table-toolbar">
        <input class="control search" placeholder="جستجو..." (input)="search.set($any($event.target).value); page.set(1)" />
        <button *ngIf="showAdd" class="btn primary" type="button" (click)="add.emit(); toast.info('فرم افزودن باز شد')">+ افزودن</button>
      </div>
      <app-base-filter-panel *ngIf="filters.length" [filters]="filters" (filtersChange)="filterValues.set($event); page.set(1)" />
      <div *ngIf="loading" class="state-card">در حال بارگذاری...</div>
      <div *ngIf="!loading && !filtered().length" class="state-card">موردی برای نمایش وجود ندارد.</div>
      <div class="desktop-table" *ngIf="!loading && filtered().length">
        <table><thead><tr><th *ngFor="let c of columns">{{ c.label }}</th><th *ngIf="hasActions()">عملیات</th></tr></thead>
          <tbody><tr *ngFor="let row of paged()"><td *ngFor="let c of columns">{{ row[c.key] }}</td><td *ngIf="hasActions()" class="actions"><ng-container *ngTemplateOutlet="actionButtons; context: {$implicit: row}"></ng-container></td></tr></tbody>
        </table>
      </div>
      <div class="mobile-cards" *ngIf="!loading && filtered().length">
        <article *ngFor="let row of paged()" class="mobile-row-card">
          <dl><ng-container *ngFor="let c of columns"><dt>{{ c.label }}</dt><dd>{{ row[c.key] }}</dd></ng-container></dl>
          <button *ngIf="hasActions()" class="btn ghost" type="button" (click)="selectedRow.set(row)">عملیات</button>
        </article>
      </div>
      <footer class="pagination"><button class="btn ghost" [disabled]="page()===1" (click)="page.set(page()-1)">قبلی</button><span>{{ page() }} / {{ pages() }}</span><button class="btn ghost" [disabled]="page()===pages()" (click)="page.set(page()+1)">بعدی</button></footer>
    </section>
    <div class="action-sheet-backdrop" *ngIf="selectedRow()" (click)="selectedRow.set(null)"></div>
    <section class="action-sheet" *ngIf="selectedRow()"><b>عملیات ردیف</b><ng-container *ngTemplateOutlet="actionButtons; context: {$implicit: selectedRow()}"></ng-container><button class="btn ghost" (click)="selectedRow.set(null)">بستن</button></section>
    <ng-template #actionButtons let-row>
      <button *ngIf="showEdit" class="icon-btn" type="button" (click)="edit.emit(row); selectedRow.set(null); toast.info('ویرایش انتخاب شد')">✎ ویرایش</button>
      <button *ngIf="showDelete" class="icon-btn danger" type="button" (click)="delete.emit(row); selectedRow.set(null); toast.warning('حذف انتخاب شد')">🗑 حذف</button>
      <button *ngFor="let a of customActions" class="icon-btn" type="button" (click)="a.onClick(row); selectedRow.set(null); toast.success(a.label + ' انجام شد')"><i *ngIf="a.icon.startsWith('fa')" [class]="a.icon" aria-hidden="true"></i><span *ngIf="!a.icon.startsWith('fa')">{{ a.icon }}</span> {{ a.label }}</button>
    </ng-template>
  `
})
export class BaseTableComponent {
  readonly toast = inject(BaseToastService);
  @Input() columns: { key: string; label: string }[] = [];
  @Input() rows: Record<string, unknown>[] = [];
  @Input() filters: FilterConfig[] = [];
  @Input() loading = false;
  @Input() showAdd = true;
  @Input() showEdit = true;
  @Input() showDelete = true;
  @Input() customActions: TableAction[] = [];
  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Record<string, unknown>>();
  @Output() delete = new EventEmitter<Record<string, unknown>>();
  search = signal(''); page = signal(1); pageSize = 6; selectedRow = signal<Record<string, unknown> | null>(null); filterValues = signal<FilterValues>({});
  hasActions() { return this.showEdit || this.showDelete || this.customActions.length > 0; }
  filtered = computed(() => this.rows.filter((row) => this.matchesSearch(row) && this.matchesFilters(row)));
  pages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize)));
  paged = computed(() => this.filtered().slice((this.page() - 1) * this.pageSize, this.page() * this.pageSize));
  private matchesSearch(row: Record<string, unknown>) { return JSON.stringify(row).toLowerCase().includes(this.search().toLowerCase()); }
  private matchesFilters(row: Record<string, unknown>) { return Object.entries(this.filterValues()).every(([key, value]) => !value || String(row[key] ?? '').toLowerCase().includes(String(value).toLowerCase())); }
}
