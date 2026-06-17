import { Component } from '@angular/core';
import { BaseTableComponent } from '../../base/base-table/base-table.component';
import { leads } from '../../shared/mock-data';

@Component({
  selector: 'app-admin-consultant-leads-page',
  standalone: true,
  imports: [BaseTableComponent],
  template: `<section class="screen-stack admin-dashboard"><article class="hero-card"><small>داشبورد مدیر</small><h2>لیدهای assign شده مشاوران</h2><p>این صفحه فقط برای مشاهده لیدهای اختصاص داده‌شده به هر مشاور است.</p></article><app-base-table [columns]="columns" [rows]="assignedLeads" [filters]="filters" [showAdd]="false" [showEdit]="false" [showDelete]="false" /></section>`
})
export class AdminConsultantLeadsPage {
  assignedLeads = leads;
  columns = [{key:'name',label:'نام لید'},{key:'phone',label:'تلفن'},{key:'assigned',label:'مشاور'},{key:'status',label:'وضعیت'}];
  filters = [{key:'assigned',label:'مشاور',type:'text' as const},{key:'status',label:'وضعیت',type:'select' as const,options:['جدید','تماس گرفته']}];
}
