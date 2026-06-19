import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseToastService } from '../../base/base-toast/base-toast.service';

type PagedResponse<T> = { items?: T[]; data?: T[]; totalCount?: number; totalPages?: number } | T[];
interface LeadAssignmentDto { userName?: string; phoneNumber?: string; leadAssignmentState?: number; leadAssignmentType?: number; id?: number; }
interface LeadAssignmentFilters { leadAssignmentState: string; LeadAssignmentType: string; PageNumber: number; PageSize: number; }

@Component({
  selector:'app-admin-leads-page',
  standalone:true,
  imports:[NgFor, NgIf, FormsModule],
  template:`<section class="screen-stack admin-dashboard"><article class="hero-card"><small>داشبورد مدیر</small><h2>مدیریت لیدها</h2><p>لیدها، وضعیت هر لید و نوع پیگیری را مشاهده کنید.</p></article><section class="table-card"><button class="btn ghost filter-toggle" type="button" (click)="filtersOpen.set(!filtersOpen())"><i class="fa-solid fa-filter"></i> فیلترهای لیدها</button><div class="filter-panel user-filter-grid responsive-filter-panel" [class.open]="filtersOpen()"><label><span>وضعیت تخصیص لید</span><select class="control" [(ngModel)]="filters.leadAssignmentState"><option value="">همه وضعیت‌ها</option><option *ngFor="let state of states" [value]="state.value">{{ state.label }}</option></select></label><label><span>نوع تخصیص لید</span><select class="control" [(ngModel)]="filters.LeadAssignmentType"><option value="">همه انواع</option><option value="1">لحظه‌ای</option><option value="2">صف آفلاین</option></select></label><button class="btn primary" type="button" (click)="loadLeads()"><i class="fa-solid fa-magnifying-glass"></i> اعمال فیلترها</button><button class="btn ghost" type="button" (click)="resetFilters()">پاک‌سازی</button></div><div *ngIf="loading()" class="state-card">در حال دریافت لیدها...</div><div *ngIf="!loading() && !leads().length" class="state-card">لیدی برای نمایش وجود ندارد.</div><div class="desktop-table" *ngIf="!loading() && leads().length"><table><thead><tr><th>نام کاربر</th><th>شماره تماس</th><th>وضعیت تخصیص</th><th>نوع تخصیص</th></tr></thead><tbody><tr *ngFor="let lead of leads()"><td>{{ lead.userName }}</td><td>{{ lead.phoneNumber }}</td><td>{{ leadStateLabel(lead.leadAssignmentState) }}</td><td>{{ leadTypeLabel(lead.leadAssignmentType) }}</td></tr></tbody></table></div><div class="mobile-cards" *ngIf="!loading() && leads().length"><article class="mobile-row-card" *ngFor="let lead of leads()"><dl><dt>نام کاربر</dt><dd>{{ lead.userName }}</dd><dt>شماره تماس</dt><dd>{{ lead.phoneNumber }}</dd><dt>وضعیت</dt><dd>{{ leadStateLabel(lead.leadAssignmentState) }}</dd><dt>نوع تخصیص</dt><dd>{{ leadTypeLabel(lead.leadAssignmentType) }}</dd></dl></article></div><footer class="pagination"><button class="btn ghost" type="button" [disabled]="filters.PageNumber === 1" (click)="changePage(filters.PageNumber - 1)">قبلی</button><label class="page-size-control"><span>تعداد در صفحه</span><select class="control" [ngModel]="filters.PageSize" (ngModelChange)="setPageSize($event)"><option [ngValue]="5">5</option><option [ngValue]="10">10</option><option [ngValue]="20">20</option><option [ngValue]="50">50</option></select></label><span>صفحه {{ filters.PageNumber }} از {{ totalPages() }} - تعداد کل: {{ totalCount() }}</span><button class="btn ghost" type="button" [disabled]="filters.PageNumber === totalPages()" (click)="changePage(filters.PageNumber + 1)">بعدی</button></footer></section></section>`
})
export class AdminLeadsPage implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(BaseToastService);
  private readonly apiBase = 'http://localhost:5182/api';
  readonly leads = signal<LeadAssignmentDto[]>([]);
  readonly loading = signal(false);
  readonly totalCount = signal(0);
  readonly totalPages = signal(1);
  readonly filtersOpen = signal(false);
  readonly states = [{value:1,label:'جدید'},{value:2,label:'تخصیص داده‌شده'},{value:3,label:'تماس گرفته‌شده'},{value:4,label:'در انتظار'},{value:5,label:'تبدیل‌شده'},{value:6,label:'منقضی‌شده'},{value:7,label:'ردشده'}];
  filters: LeadAssignmentFilters = this.defaultFilters();

  ngOnInit() { this.loadLeads(); }
  resetFilters() { this.filters = this.defaultFilters(); this.loadLeads(); }
  changePage(page: number) { this.filters.PageNumber = page; this.loadLeads(); }
  setPageSize(size: number) { this.filters.PageSize = Number(size); this.filters.PageNumber = 1; this.loadLeads(); }
  loadLeads() {
    this.loading.set(true);
    this.http.get<PagedResponse<LeadAssignmentDto>>(`${this.apiBase}/LeadAssignment`, { params: this.params() }).subscribe({
      next: (response) => { const page = this.normalize(response); this.leads.set(page.items); this.totalCount.set(page.totalCount); this.totalPages.set(page.totalPages); this.loading.set(false); },
      error: () => { this.toast.error('دریافت لیدها ناموفق بود'); this.loading.set(false); }
    });
  }
  leadStateLabel(value?: number) { return this.states.find((state) => state.value === value)?.label ?? 'نامشخص'; }
  leadTypeLabel(value?: number) { return value === 1 ? 'لحظه‌ای' : value === 2 ? 'صف آفلاین' : 'نامشخص'; }
  private params() { let params = new HttpParams().set('PageNumber', this.filters.PageNumber).set('PageSize', this.filters.PageSize); (['leadAssignmentState','LeadAssignmentType'] as const).forEach((key) => { const value = this.filters[key]; if (value !== '') params = params.set(key, String(value)); }); return params; }
  private normalize(response: PagedResponse<LeadAssignmentDto>) { if (Array.isArray(response)) return { items: response, totalCount: response.length, totalPages: 1 }; const items = response.items ?? response.data ?? []; const totalCount = response.totalCount ?? items.length; return { items, totalCount, totalPages: Math.max(1, Math.ceil(totalCount / this.filters.PageSize)) }; }
  private defaultFilters(): LeadAssignmentFilters { return { leadAssignmentState: '', LeadAssignmentType: '', PageNumber: 1, PageSize: 10 }; }
}
