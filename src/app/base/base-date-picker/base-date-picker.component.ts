import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-date-picker',
  standalone: true,
  template: `
    <label class="field date-picker">
      <span>{{ label }}</span>
      <div class="jalali-input">
        <input class="control" inputmode="numeric" maxlength="4" placeholder="سال" [value]="year" (input)="year = $any($event.target).value" />
        <input class="control" inputmode="numeric" maxlength="2" placeholder="ماه" [value]="month" (input)="month = $any($event.target).value" />
        <input class="control" inputmode="numeric" maxlength="2" placeholder="روز" [value]="day" (input)="day = $any($event.target).value" />
      </div>
      <button class="btn ghost compact" type="button" (click)="emitDate()">انتخاب تاریخ</button>
      <small>تقویم فارسی نمایشی است؛ خروجی رویداد Gregorian Date می‌باشد.</small>
    </label>
  `
})
export class BaseDatePickerComponent {
  @Input() label = 'تاریخ';
  @Output() dateChange = new EventEmitter<Date>();
  year = '1405'; month = '01'; day = '01';

  emitDate() {
    const gy = Number(this.year) + 621;
    this.dateChange.emit(new Date(Date.UTC(gy, Math.max(0, Number(this.month) - 1), Number(this.day))));
  }
}
