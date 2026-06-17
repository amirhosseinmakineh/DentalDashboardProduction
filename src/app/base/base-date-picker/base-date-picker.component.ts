import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-base-date-picker',
  standalone: true,
  template: `
    <label class="date-picker">{{ label }}
      <input class="control" type="date" (change)="emitIso($event)" />
      <small>نمایش UI فارسی/جلالی - خروجی Gregorian ISO</small>
    </label>
  `
})
export class BaseDatePickerComponent {
  label = 'تاریخ';
  @Output() isoChange = new EventEmitter<string>();
  emitIso(event: Event) { this.isoChange.emit(new Date((event.target as HTMLInputElement).value).toISOString()); }
}
