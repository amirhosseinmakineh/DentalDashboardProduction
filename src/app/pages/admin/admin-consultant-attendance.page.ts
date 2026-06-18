import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseToastService } from '../../base/base-toast/base-toast.service';

type PagedResponse<T> = { items?: T[]; data?: T[]; totalCount?: number; totalPages?: number } | T[];
interface AttendanceDto { consultantName?: string; date?: string; attendanceDate?: string; checkInTime?: string; checkOutTime?: string; status?: number | string; description?: string; id?: number | string; }

@Component({
  selector: 'app-admin-consultant-attendance-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  template: `<section class="screen-stack admin-dashboard"><article class="hero-card"><small>داشبورد مدیر</small><h2>تاریخ و زمان حضور و غیاب مشاور</h2><p>وضعیت حضور و غیاب با شناسه پروفایل مشاور از API دریافت می‌شود.</p></article><section class="table-card"><div *ngIf="loading()" class="state-card">در حال دریافت حضور و غیاب...</div><div *ngIf="!loading() && !rows().length" class="state-card">رکورد حضور و غیابی برای این مشاور وجود ندارد.</div><div class="desktop-table" *ngIf="!loading() && rows().length"><table><thead><tr><th>تاریخ</th><th>ساعت ورود</th><th>ساعت خروج</th><th>وضعیت</th><th>توضیحات</th></tr></thead><tbody><tr *ngFor="let row of rows()"><td>{{ row.attendanceDate || row.date }}</td><td>{{ row.checkInTime || '-' }}</td><td>{{ row.checkOutTime || '-' }}</td><td>{{ statusLabel(row.status) }}</td><td>{{ row.description || '-' }}</td></tr></tbody></table></div><div class="mobile-cards" *ngIf="!loading() && rows().length"><article class="mobile-row-card" *ngFor="let row of rows()"><dl><dt>تاریخ</dt><dd>{{ row.attendanceDate || row.date }}</dd><dt>ورود</dt><dd>{{ row.checkInTime || '-' }}</dd><dt>خروج</dt><dd>{{ row.checkOutTime || '-' }}</dd><dt>وضعیت</dt><dd>{{ statusLabel(row.status) }}</dd><dt>توضیحات</dt><dd>{{ row.description || '-' }}</dd></dl></article></div><footer class="pagination"><button class="btn ghost" type="button" [disabled]="pageNumber() === 1" (click)="changePage(pageNumber() - 1)">قبلی</button><label class="page-size-control"><span>تعداد در صفحه</span><select class="control" [ngModel]="pageSize()" (ngModelChange)="setPageSize($event)"><option [ngValue]="5">5</option><option [ngValue]="10">10</option><option [ngValue]="20">20</option><option [ngValue]="50">50</option></select></label><span>صفحه {{ pageNumber() }} از {{ totalPages() }} - تعداد کل: {{ totalCount() }}</span><button class="btn ghost" type="button" [disabled]="pageNumber() === totalPages()" (click)="changePage(pageNumber() + 1)">بعدی</button></footer></section></section>`
})
export class AdminConsultantAttendancePage implements OnInit {
  private readonly route=inject(ActivatedRoute); private readonly http=inject(HttpClient); private readonly toast=inject(BaseToastService); private readonly apiBase='http://localhost:5182/api';
  readonly profileId=Number(this.route.snapshot.paramMap.get('consultantId') ?? 0); readonly rows=signal<AttendanceDto[]>([]); readonly loading=signal(false); readonly totalCount=signal(0); readonly totalPages=signal(1); readonly pageNumber=signal(1); readonly pageSize=signal(10);
  ngOnInit(){this.loadAttendance();}
  loadAttendance(){this.loading.set(true);const params=new HttpParams().set('ConsultantProfileId',this.profileId).set('PageNumber',this.pageNumber()).set('PageSize',this.pageSize());this.http.get<PagedResponse<AttendanceDto>>(`${this.apiBase}/Attendance`,{params}).subscribe({next:(response)=>{const page=this.normalize(response);this.rows.set(page.items);this.totalCount.set(page.totalCount);this.totalPages.set(page.totalPages);this.loading.set(false);},error:()=>{this.toast.error('دریافت حضور و غیاب مشاور ناموفق بود');this.loading.set(false);}});}
  changePage(page:number){this.pageNumber.set(page);this.loadAttendance();}
  setPageSize(size:number){this.pageSize.set(Number(size));this.pageNumber.set(1);this.loadAttendance();}
  statusLabel(value?:number|string){if(value===1||value==='1')return'حاضر';if(value===2||value==='2')return'غایب';if(value===3||value==='3')return'آنلاین';return value ? String(value) : 'نامشخص';}
  private normalize(response:PagedResponse<AttendanceDto>){if(Array.isArray(response))return{items:response,totalCount:response.length,totalPages:1};const items=response.items??response.data??[];const totalCount=response.totalCount??items.length;return{items,totalCount,totalPages:Math.max(1,response.totalPages??Math.ceil(totalCount/this.pageSize()))};}
}
