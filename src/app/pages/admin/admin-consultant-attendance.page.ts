import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../../base/base-table/base-table.component';
import { ConsultantStatus, consultantAttendance } from '../../shared/mock-data';

@Component({
  selector: 'app-admin-consultant-attendance-page',
  standalone: true,
  imports: [BaseTableComponent],
  template: `<section class="screen-stack admin-dashboard"><article class="hero-card"><small>داشبورد مدیر</small><h2>تاریخ و زمان حضور و غیاب مشاور</h2><p>این صفحه با id مشاور باز شده و تاریخ، ساعت ورود، ساعت خروج و وضعیت حضور همان مشاور را نشان می‌دهد.</p></article><app-base-table [columns]="columns" [rows]="attendanceRows" [filters]="filters" [showAdd]="false" [showEdit]="false" [showDelete]="false" /></section>`
})
export class AdminConsultantAttendancePage {
  private route = inject(ActivatedRoute);
  consultantId = this.route.snapshot.paramMap.get('consultantId') ?? '';
  attendanceRows = consultantAttendance.filter((row) => row.consultantId === this.consultantId);
  columns = [{key:'consultant',label:'مشاور'},{key:'date',label:'تاریخ'},{key:'checkIn',label:'ساعت ورود'},{key:'checkOut',label:'ساعت خروج'},{key:'status',label:'وضعیت'}];
  filters = [{key:'status',label:'وضعیت',type:'select' as const,options:[ConsultantStatus.Present,ConsultantStatus.Online,ConsultantStatus.Absent]}];
}
