import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseDatePickerComponent } from '../base-date-picker/base-date-picker.component';

export interface FilterConfig { key: string; label: string; type: 'text' | 'select' | 'date'; options?: string[]; }
export type FilterValues = Record<string, string | Date>;

@Component({
  selector: 'app-base-filter-panel',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, BaseDatePickerComponent],
  template: `
    <section class="filter-panel">
      <div *ngFor="let filter of filters" class="filter-control">
        <label *ngIf="filter.type === 'text'">{{ filter.label }}<input class="control" [(ngModel)]="values[filter.key]" (ngModelChange)="emitChange()" /></label>
        <label *ngIf="filter.type === 'select'">{{ filter.label }}<select class="control" [(ngModel)]="values[filter.key]" (ngModelChange)="emitChange()"><option value="">همه</option><option *ngFor="let option of filter.options" [value]="option">{{ option }}</option></select></label>
        <app-base-date-picker *ngIf="filter.type === 'date'" [label]="filter.label" (dateChange)="setDate(filter.key, $event)" />
      </div>
    </section>
  `
})
export class BaseFilterPanelComponent {
  @Input() filters: FilterConfig[] = [];
  @Output() filtersChange = new EventEmitter<FilterValues>();
  values: FilterValues = {};
  setDate(key: string, value: Date) { this.values[key] = value; this.emitChange(); }
  emitChange() { this.filtersChange.emit({ ...this.values }); }
}
