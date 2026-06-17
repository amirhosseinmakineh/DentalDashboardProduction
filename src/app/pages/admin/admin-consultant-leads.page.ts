import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../../base/base-table/base-table.component';
import { leads, LeadStatus } from '../../shared/mock-data';

@Component({
  selector: 'app-admin-consultant-leads-page',
  standalone: true,
  imports: [BaseTableComponent],
  template: `<section class="screen-stack admin-dashboard"><article class="hero-card"><small>داشبورد مدیر</small><h2>لیدهای تخصیص‌داده‌شده مشاور</h2><p>این صفحه با id مشاور باز شده و فقط لیدهای مربوط به همان مشاور را نمایش می‌دهد.</p></article><app-base-table [columns]="columns" [rows]="assignedLeads" [filters]="filters" [showAdd]="false" [showEdit]="false" [showDelete]="false" /></section>`
})
export class AdminConsultantLeadsPage {
  private route = inject(ActivatedRoute);
  consultantId = this.route.snapshot.paramMap.get('consultantId') ?? '';
  assignedLeads = leads.filter((lead) => lead.consultantId === this.consultantId);
  columns = [{key:'name',label:'نام لید'},{key:'phone',label:'تلفن'},{key:'assigned',label:'مشاور'},{key:'status',label:'وضعیت'}];
  filters = [{key:'status',label:'وضعیت',type:'select' as const,options:[LeadStatus.New,LeadStatus.Called]}];
}
