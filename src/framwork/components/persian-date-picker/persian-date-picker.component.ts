import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import moment from 'jalali-moment';

@Component({
  selector: 'app-persian-date-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './persian-date-picker.component.html',
  styleUrls: ['./persian-date-picker.component.css']
})
export class PersianDatePickerComponent {
  @Output() dateChanged = new EventEmitter<{
    persianDate: string;
    gregorianDate: string | null;
  }>();

  isOpen = false;

  today = moment().locale('fa');

  currentYear = Number(this.today.format('jYYYY'));
  currentMonth = Number(this.today.format('jMM'));

  selectedDate = '';

  weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

  get monthName(): string {
    return moment(`${this.currentYear}/${this.currentMonth}/01`, 'jYYYY/jMM/jDD')
      .locale('fa')
      .format('jMMMM jYYYY');
  }

  get days(): Array<number | null> {
    const firstDay = moment(`${this.currentYear}/${this.currentMonth}/01`, 'jYYYY/jMM/jDD');
    const daysInMonth = firstDay.jDaysInMonth();

    const startDay = firstDay.day();
    const emptyCount = startDay === 6 ? 0 : startDay + 1;

    const result: Array<number | null> = [];

    for (let i = 0; i < emptyCount; i++) {
      result.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      result.push(day);
    }

    return result;
  }

  toggleCalendar(): void {
    this.isOpen = !this.isOpen;
  }

  previousMonth(): void {
    if (this.currentMonth === 1) {
      this.currentMonth = 12;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
  }

  nextMonth(): void {
    if (this.currentMonth === 12) {
      this.currentMonth = 1;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
  }

  selectDay(day: number | null): void {
    if (!day) return;

    const persianDate = `${this.currentYear}/${this.pad(this.currentMonth)}/${this.pad(day)}`;

    const gregorianDate = moment(persianDate, 'jYYYY/jMM/jDD')
      .locale('en')
      .format('YYYY-MM-DD');

    this.selectedDate = persianDate;
    this.isOpen = false;

    this.dateChanged.emit({
      persianDate,
      gregorianDate
    });
  }

  private pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
