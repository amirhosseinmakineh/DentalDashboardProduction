import { Component } from '@angular/core';
import { BaseTableComponent } from '../../base/base-table/base-table.component';
import { consultantAttendance } from '../../shared/mock-data';

@Component({
  selector: 'app-admin-consultant-attendance-page',
  standalone: true,
  imports: [BaseTableComponent],
  template: `<section class="screen-stack admin-dashboard"><article class="hero-card"><small>داشبورد مدیر</small><h2>تاریخ و زمان حضور و غیاب مشاوران</h2><p>در این بخش تاریخ، ساعت ورود، ساعت خروج و وضعیت حضور مشاوران فقط قابل مشاهده است.</p></article><app-base-table [columns]="columns" [rows]="attendanceRows" [filters]="filters" [showAdd]="false" [showEdit]="false" [showDelete]="false" /></section>`
})
export class AdminConsultantAttendancePage {
  attendanceRows = consultantAttendance;
  columns = [{key:'consultant',label:'مشاور'},{key:'date',label:'تاریخ'},{key:'checkIn',label:'ساعت ورود'},{key:'checkOut',label:'ساعت خروج'},{key:'status',label:'وضعیت'}];
  filters = [{key:'consultant',label:'مشاور',type:'text' as const},{key:'status',label:'وضعیت',type:'select' as const,options:['حاضر','آنلاین','غایب']}];
}
