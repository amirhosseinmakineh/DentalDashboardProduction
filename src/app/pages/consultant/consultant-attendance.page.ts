import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseToastService } from '../../base/base-toast/base-toast.service';

type ApiResult = { isSuccess: boolean; message: string };
type PagedResponse<T> = { items?: T[]; data?: T[]; totalCount?: number; pageNumber?: number; pageSize?: number } | T[];
interface LeadAssignmentItem { id: number; userName: string; phoneNumber: string; leadAssignmentState: number; leadAssignmentType: number; }

const LeadAssignmentType = { RealTime: 1, OfflineQueue: 2 } as const;
function readStorage(key:string,fallback=''){return typeof localStorage==='undefined'?fallback:(localStorage.getItem(key)??fallback);}
function writeStorage(key:string,value:string){if(typeof localStorage!=='undefined')localStorage.setItem(key,value);}
const LeadAssignmentState = { Assigned: 2, Converted: 5, Expired: 6, Rejected: 7 } as const;

@Component({
  selector:'app-consultant-attendance-page',
  standalone:true,
  imports:[NgIf, FormsModule],
  template:`<section class="screen-stack consultant-dashboard">
    <article class="hero-card"><small>داشبورد مشاور</small><h2>حضور / وضعیت آنلاین</h2><p>ثبت حضور، خروج از شیفت و آنلاین/آفلاین شدن برای دریافت لیدهای لحظه‌ای.</p></article>
    <article class="state-card">
      <div class="filter-panel user-filter-grid responsive-filter-panel open">
        <label><span>شناسه پروفایل مشاور</span><input class="control" type="number" [(ngModel)]="profileId" (ngModelChange)="persistProfileId()" placeholder="مثلا 12" /></label>
        <button class="btn ghost" type="button" (click)="loadLeads()"><i class="fa-solid fa-rotate"></i> Refresh لیدها</button>
      </div>
      <h3>وضعیت حضور: {{ isAvailable() ? 'حاضر' : 'خارج از شیفت / ثبت‌نشده' }}</h3>
      <p>وضعیت دریافت لید: <strong>{{ leadReceiveStatus() }}</strong> - لید آفلاین باز: {{ openOfflineCount() }} - لید لحظه‌ای فعال: {{ activeRealTimeCount() }}</p>
      <div class="quick-actions">
        <button class="btn primary" [disabled]="!profileId || isAvailable() || actionLoading()" (click)="setAvailable(true)">ثبت حضور</button>
        <button class="btn danger" [disabled]="!profileId || !isAvailable() || actionLoading()" (click)="setAvailable(false)">ثبت خروج</button>
        <button class="btn" [disabled]="!profileId || !isAvailable() || isOnline() || hasOpenOfflineLead() || hasActiveRealTime() || actionLoading()" (click)="setOnline(true)">آنلاین شدن</button>
        <button class="btn ghost" [disabled]="!profileId || !isOnline() || actionLoading()" (click)="setOnline(false)">آفلاین شدن</button>
      </div>
      <p *ngIf="hasOpenOfflineLead()" class="state-card">ابتدا لیدهای آفلاین باز را در صفحه «لیدهای من» تعیین تکلیف کنید.</p>
      <p *ngIf="hasActiveRealTime()" class="state-card">یک لید لحظه‌ای فعال دارید؛ تا ثبت گزارش، وضعیت شما مشغول در نظر گرفته می‌شود.</p>
    </article>
  </section>`
})
export class ConsultantAttendancePage implements OnInit, OnDestroy {
  private readonly http=inject(HttpClient); private readonly toast=inject(BaseToastService); private readonly apiBase='http://localhost:5182/api'; private poll?: ReturnType<typeof setInterval>;
  profileId=Number(readStorage('consultantProfileId','0'));
  readonly isAvailable=signal(readStorage('consultantIsAvailable')==='true'); readonly isOnline=signal(readStorage('consultantIsOnline')==='true'); readonly leads=signal<LeadAssignmentItem[]>([]); readonly actionLoading=signal(false);
  readonly openOfflineCount=computed(()=>this.leads().filter(l=>l.leadAssignmentType===LeadAssignmentType.OfflineQueue&&!this.isFinalLeadState(l.leadAssignmentState)).length);
  readonly activeRealTimeCount=computed(()=>this.leads().filter(l=>l.leadAssignmentType===LeadAssignmentType.RealTime&&l.leadAssignmentState===LeadAssignmentState.Assigned).length);
  readonly hasOpenOfflineLead=computed(()=>this.openOfflineCount()>0); readonly hasActiveRealTime=computed(()=>this.activeRealTimeCount()>0);
  readonly leadReceiveStatus=computed(()=>this.hasActiveRealTime()?'مشغول تماس':this.isOnline()?'آنلاین':'آفلاین');
  ngOnInit(){this.loadLeads(); this.poll=setInterval(()=>{if(this.isOnline())this.loadLeads(false);},45000);} ngOnDestroy(){if(this.poll)clearInterval(this.poll);}
  persistProfileId(){writeStorage('consultantProfileId',String(this.profileId||'')); this.loadLeads();}
  setAvailable(isAvailable:boolean){this.actionLoading.set(true);this.http.post<ApiResult>(`${this.apiBase}/Consultant/SetAvalableConsultant`,{profileId:this.profileId,isAvailable}).subscribe({next:r=>{this.handleResult(r,()=>{this.isAvailable.set(isAvailable);this.isOnline.set(false);this.persistState();this.loadLeads(false);});},error:()=>{this.toast.error('ثبت وضعیت حضور ناموفق بود');this.actionLoading.set(false);}});}
  setOnline(isOnline:boolean){this.actionLoading.set(true);this.http.post<ApiResult>(`${this.apiBase}/Consultant/SetOnlineOfflineConsultant`,{profileId:this.profileId,isOnline,isOffline:!isOnline}).subscribe({next:r=>{this.handleResult(r,()=>{this.isOnline.set(isOnline);this.persistState();this.loadLeads(false);});},error:()=>{this.toast.error('ثبت وضعیت آنلاین/آفلاین ناموفق بود');this.actionLoading.set(false);}});}
  loadLeads(showError=true){if(!this.profileId)return;const params=new HttpParams().set('profileId',this.profileId).set('pageNumber',1).set('pageSize',50);this.http.get<PagedResponse<LeadAssignmentItem>>(`${this.apiBase}/Consultant/GetLeads`,{params}).subscribe({next:r=>this.leads.set(Array.isArray(r)?r:(r.items??r.data??[])),error:()=>showError&&this.toast.error('دریافت لیدهای مشاور ناموفق بود')});}
  private handleResult(r:ApiResult,success:()=>void){r.isSuccess?this.toast.success(r.message):this.toast.error(r.message);if(r.isSuccess)success();this.actionLoading.set(false);} private persistState(){writeStorage('consultantIsAvailable',String(this.isAvailable()));writeStorage('consultantIsOnline',String(this.isOnline()));}
  private isFinalLeadState(state:number){return [LeadAssignmentState.Converted,LeadAssignmentState.Rejected,LeadAssignmentState.Expired].includes(state as 5|6|7);}
}
