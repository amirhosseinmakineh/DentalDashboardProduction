import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseToastService } from '../../base/base-toast/base-toast.service';

type PagedResponse<T> = { items?: T[]; data?: T[]; totalCount?: number } | T[];
interface ConsultantLeadDto { userName?: string; phoneNumber?: string; leadAssignmentState?: number; leadAssignmentType?: number; id?: number; }
interface LeadFilters { leadAssignmentState:string; LeadAssignmentType:string; PageNumber:number; PageSize:number; }

@Component({
  selector: 'app-admin-consultant-leads-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  template: `<section class="screen-stack admin-dashboard"><article class="hero-card"><small>داشبورد مدیر</small><h2>لیدهای تخصیص‌داده‌شده مشاور</h2><p>لیدها با شناسه پروفایل مشاور از بک‌اند دریافت می‌شوند.</p></article><section class="table-card"><button class="btn ghost filter-toggle" type="button" (click)="filtersOpen.set(!filtersOpen())"><i class="fa-solid fa-filter"></i> فیلترهای لیدها</button><div class="filter-panel user-filter-grid responsive-filter-panel" [class.open]="filtersOpen()"><label><span>وضعیت تخصیص لید</span><select class="control" [(ngModel)]="filters.leadAssignmentState"><option value="">همه وضعیت‌ها</option><option *ngFor="let state of states" [value]="state.value">{{ state.label }}</option></select></label><label><span>نوع تخصیص لید</span><select class="control" [(ngModel)]="filters.LeadAssignmentType"><option value="">همه انواع</option><option value="1">دستی</option><option value="2">سیستمی</option></select></label><button class="btn primary" type="button" (click)="loadLeads()"><i class="fa-solid fa-magnifying-glass"></i> اعمال فیلترها</button><button class="btn ghost" type="button" (click)="resetFilters()">پاک‌سازی</button></div><div *ngIf="loading()" class="state-card">در حال دریافت لیدهای مشاور...</div><div *ngIf="!loading() && !leads().length" class="state-card">لیدی برای این مشاور یافت نشد.</div><div class="desktop-table" *ngIf="!loading() && leads().length"><table><thead><tr><th>نام لید</th><th>شماره تماس</th><th>وضعیت تخصیص</th><th>نوع تخصیص</th></tr></thead><tbody><tr *ngFor="let lead of leads()"><td>{{ lead.userName }}</td><td>{{ lead.phoneNumber }}</td><td>{{ leadStateLabel(lead.leadAssignmentState) }}</td><td>{{ leadTypeLabel(lead.leadAssignmentType) }}</td></tr></tbody></table></div><div class="mobile-cards" *ngIf="!loading() && leads().length"><article class="mobile-row-card" *ngFor="let lead of leads()"><dl><dt>نام لید</dt><dd>{{ lead.userName }}</dd><dt>شماره تماس</dt><dd>{{ lead.phoneNumber }}</dd><dt>وضعیت</dt><dd>{{ leadStateLabel(lead.leadAssignmentState) }}</dd><dt>نوع</dt><dd>{{ leadTypeLabel(lead.leadAssignmentType) }}</dd></dl></article></div><footer class="pagination"><span>تعداد کل: {{ totalCount() }}</span></footer></section></section>`
})
export class AdminConsultantLeadsPage implements OnInit {
  private readonly route=inject(ActivatedRoute); private readonly http=inject(HttpClient); private readonly toast=inject(BaseToastService); private readonly apiBase='http://localhost:5182/api';
  readonly profileId=Number(this.route.snapshot.paramMap.get('consultantId') ?? 0); readonly leads=signal<ConsultantLeadDto[]>([]); readonly loading=signal(false); readonly totalCount=signal(0); readonly filtersOpen=signal(false);
  readonly states=[1,2,3,4,5,6,7].map((value)=>({value,label:`وضعیت ${value}`})); filters:LeadFilters=this.defaultFilters();
  ngOnInit(){this.loadLeads();}
  resetFilters(){this.filters=this.defaultFilters();this.loadLeads();}
  loadLeads(){this.loading.set(true);this.http.get<PagedResponse<ConsultantLeadDto>>(`${this.apiBase}/Consultant/GetLeads`,{params:this.params()}).subscribe({next:(response)=>{const page=this.normalize(response);this.leads.set(page.items);this.totalCount.set(page.totalCount);this.loading.set(false);},error:()=>{this.toast.error('دریافت لیدهای مشاور ناموفق بود');this.loading.set(false);}});}
  leadStateLabel(value?:number){return value?`وضعیت ${value}`:'نامشخص';}
  leadTypeLabel(value?:number){return value===1?'دستی':value===2?'سیستمی':'نامشخص';}
  private params(){let params=new HttpParams().set('ConsultantProfileId',this.profileId).set('ProfileId',this.profileId).set('consultantProfileId',this.profileId).set('PageNumber',this.filters.PageNumber).set('PageSize',this.filters.PageSize);(['leadAssignmentState','LeadAssignmentType'] as const).forEach((key)=>{const value=this.filters[key];if(value!=='')params=params.set(key,String(value));});return params;}
  private normalize(response:PagedResponse<ConsultantLeadDto>){if(Array.isArray(response))return{items:response,totalCount:response.length};return{items:response.items??response.data??[],totalCount:response.totalCount??(response.items??response.data??[]).length};}
  private defaultFilters():LeadFilters{return{leadAssignmentState:'',LeadAssignmentType:'',PageNumber:1,PageSize:10};}
}
