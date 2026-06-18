import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-base-date-picker',
  standalone: true,
  imports: [NgFor, NgIf],
  styles: [`
    .persian-date-picker { position: relative; display: grid; gap: .55rem; }
    .picker-trigger { display: flex; align-items: center; justify-content: space-between; gap: .75rem; width: 100%; text-align: right; }
    .picker-trigger i { color: var(--primary); }
    .calendar-popover { position: absolute; z-index: 30; inset-block-start: calc(100% + .5rem); inset-inline: 0; padding: .9rem; border: 1px solid #dbe3ef; border-radius: 18px; background: #fff; box-shadow: 0 24px 70px rgba(15, 23, 42, .18); min-width: min(100%, 320px); }
    .calendar-head { display: flex; align-items: center; justify-content: space-between; gap: .75rem; margin-bottom: .75rem; }
    .calendar-title { font-weight: 900; color: var(--text); }
    .calendar-nav { border: 0; width: 2rem; height: 2rem; border-radius: 999px; background: #eef4ff; color: var(--primary); cursor: pointer; }
    .weekdays, .days-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: .35rem; text-align: center; }
    .weekdays span { font-size: .72rem; color: var(--muted); font-weight: 800; }
    .day-cell { border: 0; border-radius: 12px; min-height: 2.15rem; background: #f8fafc; color: var(--text); cursor: pointer; font-weight: 800; }
    .day-cell:hover, .day-cell.selected { background: linear-gradient(135deg, var(--primary), #38bdf8); color: #fff; }
    .picker-actions { display: flex; gap: .5rem; justify-content: flex-end; margin-top: .75rem; }
  `],
  template: `
    <label class="field persian-date-picker">
      <span>{{ label }}</span>
      <button class="control picker-trigger" type="button" (click)="toggle()">
        <span>{{ displayValue }}</span>
        <i class="fa-solid fa-calendar-days"></i>
      </button>
      <div class="calendar-popover" *ngIf="open">
        <div class="calendar-head">
          <button class="calendar-nav" type="button" (click)="changeMonth(-1)"><i class="fa-solid fa-chevron-right"></i></button>
          <strong class="calendar-title">{{ monthNames[month - 1] }} {{ year }}</strong>
          <button class="calendar-nav" type="button" (click)="changeMonth(1)"><i class="fa-solid fa-chevron-left"></i></button>
        </div>
        <div class="weekdays"><span *ngFor="let day of weekDays">{{ day }}</span></div>
        <div class="days-grid">
          <button class="day-cell" type="button" *ngFor="let day of days" [class.selected]="day === selectedDay" (click)="selectDay(day)">{{ day }}</button>
        </div>
        <div class="picker-actions"><button class="btn ghost compact" type="button" (click)="today()">امروز</button><button class="btn primary compact" type="button" (click)="emitDate()">تایید تاریخ</button></div>
      </div>
    </label>
  `
})
export class BaseDatePickerComponent implements OnChanges {
  @Input() label = 'تاریخ';
  @Input() value: string | Date | null = null;
  @Output() dateChange = new EventEmitter<Date>();

  open = false;
  year = 1405;
  month = 1;
  selectedDay = 1;
  readonly weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  readonly monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

  get days() { return Array.from({ length: this.daysInMonth(this.month) }, (_, index) => index + 1); }
  get displayValue() { return `${this.selectedDay.toString().padStart(2, '0')} ${this.monthNames[this.month - 1]} ${this.year}`; }

  ngOnChanges(changes: SimpleChanges) { if (changes['value']) this.syncFromValue(); }
  toggle() { this.open = !this.open; }
  changeMonth(step: number) {
    this.month += step;
    if (this.month > 12) { this.month = 1; this.year += 1; }
    if (this.month < 1) { this.month = 12; this.year -= 1; }
    this.selectedDay = Math.min(this.selectedDay, this.daysInMonth(this.month));
  }
  selectDay(day: number) { this.selectedDay = day; }
  today() { this.applyGregorianDate(new Date()); }
  emitDate() { this.dateChange.emit(this.toGregorianDate()); this.open = false; }

  private syncFromValue() {
    if (!this.value) return;
    const date = this.value instanceof Date ? this.value : new Date(this.value);
    if (Number.isNaN(date.getTime())) return;
    this.applyGregorianDate(date);
  }
  private applyGregorianDate(date: Date) {
    const jalali = this.gregorianToJalali(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
    this.year = jalali.year;
    this.month = jalali.month;
    this.selectedDay = jalali.day;
  }
  private toGregorianDate() {
    const gregorian = this.jalaliToGregorian(this.year, this.month, this.selectedDay);
    return new Date(Date.UTC(gregorian.year, gregorian.month - 1, gregorian.day));
  }
  private daysInMonth(month: number) { return month <= 6 ? 31 : month <= 11 ? 30 : this.isJalaliLeapYear(this.year) ? 30 : 29; }
  private gregorianToJalali(gy: number, gm: number, gd: number) {
    const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    gy -= 1600; gm -= 1; gd -= 1;
    let gDayNo = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);
    for (let i = 0; i < gm; ++i) gDayNo += gDaysInMonth[i];
    if (gm > 1 && ((gy + 1600) % 4 === 0 && ((gy + 1600) % 100 !== 0 || (gy + 1600) % 400 === 0))) gDayNo += 1;
    gDayNo += gd;
    let jDayNo = gDayNo - 79;
    const jNp = Math.floor(jDayNo / 12053);
    jDayNo %= 12053;
    let jy = 979 + 33 * jNp + 4 * Math.floor(jDayNo / 1461);
    jDayNo %= 1461;
    if (jDayNo >= 366) { jy += Math.floor((jDayNo - 1) / 365); jDayNo = (jDayNo - 1) % 365; }
    let jm = 0;
    while (jm < 11 && jDayNo >= jDaysInMonth[jm]) { jDayNo -= jDaysInMonth[jm]; jm += 1; }
    return { year: jy, month: jm + 1, day: jDayNo + 1 };
  }
  private jalaliToGregorian(jy: number, jm: number, jd: number) {
    const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    jy -= 979; jm -= 1; jd -= 1;
    let jDayNo = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4);
    for (let i = 0; i < jm; ++i) jDayNo += jDaysInMonth[i];
    jDayNo += jd;
    let gDayNo = jDayNo + 79;
    let gy = 1600 + 400 * Math.floor(gDayNo / 146097);
    gDayNo %= 146097;
    let leap = true;
    if (gDayNo >= 36525) { gDayNo -= 1; gy += 100 * Math.floor(gDayNo / 36524); gDayNo %= 36524; if (gDayNo >= 365) gDayNo += 1; else leap = false; }
    gy += 4 * Math.floor(gDayNo / 1461);
    gDayNo %= 1461;
    if (gDayNo >= 366) { leap = false; gDayNo -= 1; gy += Math.floor(gDayNo / 365); gDayNo %= 365; }
    let gm = 0;
    while (gm < 11 && gDayNo >= gDaysInMonth[gm] + (gm === 1 && leap ? 1 : 0)) { gDayNo -= gDaysInMonth[gm] + (gm === 1 && leap ? 1 : 0); gm += 1; }
    return { year: gy, month: gm + 1, day: gDayNo + 1 };
  }
  private isJalaliLeapYear(year: number) { return [1, 5, 9, 13, 17, 22, 26, 30].includes(year % 33); }
}
