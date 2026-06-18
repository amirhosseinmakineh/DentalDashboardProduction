import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseDialogComponent } from '../../base/base-dialog/base-dialog.component';
import { BaseToastService } from '../../base/base-toast/base-toast.service';

type PagedResponse<T> = { items?: T[]; data?: T[]; totalCount?: number; pageNumber?: number; pageSize?: number; totalPages?: number } | T[];
interface ConsultantDto { firstName?: string; lastName?: string; phoneNumber?: string; profileId: number; id: string; }
interface ConsultantFilters { FirstName:string; LastName:string; PhoneNumber:string; PageNumber:number; PageSize:number; }
interface ScoreForm { consultantProfileId:number; source:number; reason:number; scoreValue:number; description:string; leadAssignmentId:number; }

@Component({
  selector:'app-admin-consultants-page',
  standalone:true,
  imports:[NgFor, NgIf, FormsModule, BaseDialogComponent],
  template:`<section class="screen-stack admin-dashboard">
    <article class="hero-card"><small>داشبورد مدیر</small><h2>مدیریت مشاوران</h2><p>مشاوران به صورت مستقیم از بک‌اند دریافت می‌شوند؛ مشاهده لیدها و حضور و غیاب با شناسه پروفایل مشاور انجام می‌شود.</p></article>
    <section class="table-card">
      <button class="btn ghost filter-toggle" type="button" (click)="filtersOpen.set(!filtersOpen())"><i class="fa-solid fa-filter"></i> فیلترهای مشاوران</button>
      <div class="filter-panel user-filter-grid responsive-filter-panel" [class.open]="filtersOpen()">
        <label><span>نام مشاور</span><input class="control" [(ngModel)]="filters.FirstName" placeholder="مثلا: سارا" /></label>
        <label><span>نام خانوادگی مشاور</span><input class="control" [(ngModel)]="filters.LastName" placeholder="مثلا: احمدی" /></label>
        <label><span>شماره موبایل مشاور</span><input class="control" [(ngModel)]="filters.PhoneNumber" placeholder="0912..." /></label>
        <button class="btn primary" type="button" (click)="loadConsultants()"><i class="fa-solid fa-magnifying-glass"></i> اعمال فیلترها</button>
        <button class="btn ghost" type="button" (click)="resetFilters()"><i class="fa-solid fa-rotate-right"></i> پاک‌سازی</button>
      </div>
      <div *ngIf="loading()" class="state-card">در حال دریافت مشاوران...</div>
      <div *ngIf="!loading() && !consultants().length" class="state-card">مشاوری برای نمایش وجود ندارد.</div>
      <div class="desktop-table" *ngIf="!loading() && consultants().length"><table><thead><tr><th>نام</th><th>نام خانوادگی</th><th>موبایل</th><th>شناسه پروفایل</th><th>عملیات</th></tr></thead><tbody><tr *ngFor="let consultant of consultants()"><td>{{ consultant.firstName }}</td><td>{{ consultant.lastName }}</td><td>{{ consultant.phoneNumber }}</td><td>{{ consultant.profileId }}</td><td class="actions"><button class="icon-btn" type="button" (click)="openRating(consultant)"><i class="fa-solid fa-star"></i> ثبت امتیاز</button><button class="icon-btn" type="button" (click)="openConsultantPage(consultant,'leads')"><i class="fa-solid fa-list-check"></i> لیدها</button><button class="icon-btn" type="button" (click)="openConsultantPage(consultant,'attendance')"><i class="fa-solid fa-clock"></i> حضور و غیاب</button></td></tr></tbody></table></div>
      <div class="mobile-cards" *ngIf="!loading() && consultants().length"><article class="mobile-row-card" *ngFor="let consultant of consultants()"><dl><dt>نام</dt><dd>{{ consultant.firstName }} {{ consultant.lastName }}</dd><dt>موبایل</dt><dd>{{ consultant.phoneNumber }}</dd><dt>شناسه پروفایل</dt><dd>{{ consultant.profileId }}</dd></dl><div class="actions"><button class="btn ghost" type="button" (click)="openRating(consultant)">ثبت امتیاز</button><button class="btn ghost" type="button" (click)="openConsultantPage(consultant,'leads')">لیدها</button><button class="btn ghost" type="button" (click)="openConsultantPage(consultant,'attendance')">حضور و غیاب</button></div></article></div>
      <footer class="pagination"><span>تعداد کل: {{ totalCount() }}</span></footer>
    </section>
  </section>
  <app-base-dialog [open]="ratingOpen()" title="ثبت امتیاز مدیریتی مشاور" confirmLabel="ثبت امتیاز" (closed)="ratingOpen.set(false)" (confirm)="saveRating()"><div class="form-grid"><input class="control" type="number" placeholder="مقدار امتیاز" [(ngModel)]="scoreForm.scoreValue" /><select class="control" [(ngModel)]="scoreForm.reason"><option [ngValue]="1">عملکرد عالی</option><option [ngValue]="2">پیگیری مناسب</option><option [ngValue]="3">نیازمند بهبود</option></select><textarea class="control" placeholder="توضیحات امتیاز" [(ngModel)]="scoreForm.description"></textarea></div></app-base-dialog>`
})
export class AdminConsultantsPage implements OnInit {
  private readonly http=inject(HttpClient); private readonly toast=inject(BaseToastService); private readonly router=inject(Router); private readonly apiBase='http://localhost:5182/api';
  readonly consultants=signal<ConsultantDto[]>([]); readonly loading=signal(false); readonly totalCount=signal(0); readonly filtersOpen=signal(false); readonly ratingOpen=signal(false);
  filters:ConsultantFilters=this.defaultFilters();
  scoreForm:ScoreForm={consultantProfileId:0,source:1,reason:1,scoreValue:0,description:'',leadAssignmentId:0};
  ngOnInit(){this.loadConsultants();}
  resetFilters(){this.filters=this.defaultFilters();this.loadConsultants();}
  loadConsultants(){this.loading.set(true);this.http.get<PagedResponse<ConsultantDto>>(`${this.apiBase}/Consultant/GetConsultants`,{params:this.filterParams()}).subscribe({next:(response)=>{const page=this.normalize(response);this.consultants.set(page.items);this.totalCount.set(page.totalCount);this.loading.set(false);},error:()=>{this.toast.error('دریافت لیست مشاوران ناموفق بود');this.loading.set(false);}});}
  openConsultantPage(row:ConsultantDto,section:'leads'|'attendance'){this.router.navigate(['/admin/consultants', row.profileId, section]);}
  openRating(row:ConsultantDto){this.scoreForm={consultantProfileId:row.profileId,source:1,reason:1,scoreValue:0,description:'',leadAssignmentId:0};this.ratingOpen.set(true);}
  saveRating(){this.http.post(`${this.apiBase}/ScoreLog`,this.scoreForm).subscribe({next:()=>{this.toast.success('امتیاز مدیریتی مشاور ثبت شد');this.ratingOpen.set(false);},error:()=>this.toast.error('ثبت امتیاز مشاور ناموفق بود')});}
  private filterParams(){let params=new HttpParams().set('PageNumber',this.filters.PageNumber).set('PageSize',this.filters.PageSize);(['FirstName','LastName','PhoneNumber'] as const).forEach((key)=>{const value=this.filters[key];if(value!=='')params=params.set(key,String(value));});return params;}
  private normalize(response:PagedResponse<ConsultantDto>){if(Array.isArray(response))return{items:response,totalCount:response.length};return{items:response.items??response.data??[],totalCount:response.totalCount??(response.items??response.data??[]).length};}
  private defaultFilters():ConsultantFilters{return{FirstName:'',LastName:'',PhoneNumber:'',PageNumber:1,PageSize:10};}
}
