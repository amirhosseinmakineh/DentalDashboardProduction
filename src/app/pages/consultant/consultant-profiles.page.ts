import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BaseToastService } from '../../base/base-toast/base-toast.service';
import { currentConsultantProfileId, currentUserPhone, extractConsultantProfileId, persistConsultantProfileId, readStorage, writeStorage } from '../../core/consultant-profile-context';

type ApiResult = { isSuccess?: boolean; message?: string; profileId?: number; id?: number; data?: unknown };
interface ConsultantProfileForm { firstName: string; lastName: string; phoneNumber: string; }

@Component({
  selector:'app-consultant-profiles-page',
  standalone:true,
  imports:[NgIf, FormsModule],
  template:`<section class="screen-stack consultant-dashboard">
    <article class="hero-card"><small>داشبورد مشاور</small><h2>تکمیل پروفایل مشاور</h2><p>این شناسه بعد از ثبت پروفایل ذخیره می‌شود و همه عملیات حضور، آنلاین شدن و لیدها با همان انجام می‌شود.</p></article>
    <section class="table-card">
      <div class="state-card">شناسه پروفایل ذخیره‌شده: <strong>{{ profileId() || 'ثبت نشده' }}</strong></div>
      <form class="form-grid" (ngSubmit)="saveProfile()">
        <input class="control" name="firstName" [(ngModel)]="form.firstName" placeholder="نام" required />
        <input class="control" name="lastName" [(ngModel)]="form.lastName" placeholder="نام خانوادگی" required />
        <input class="control" name="phoneNumber" [(ngModel)]="form.phoneNumber" placeholder="شماره موبایل" required />
        <button class="btn primary" type="submit" [disabled]="saving()">تکمیل / ذخیره پروفایل مشاور</button>
      </form>
      <p *ngIf="profileId()" class="state-card">پروفایل شما آماده است؛ اکنون می‌توانید در صفحه حضور دکمه «ثبت حضور» را بزنید و در صفحه «لیدهای من» اطلاعات را از API دریافت کنید.</p>
    </section>
  </section>`
})
export class ConsultantProfilesPage {
  private readonly http=inject(HttpClient); private readonly toast=inject(BaseToastService); private readonly apiBase='http://localhost:5182/api';
  readonly profileId=signal(currentConsultantProfileId()); readonly saving=signal(false);
  form: ConsultantProfileForm = {
    firstName: readStorage('currentUserFirstName'),
    lastName: readStorage('currentUserLastName'),
    phoneNumber: currentUserPhone()
  };

  saveProfile(){
    if(!this.form.phoneNumber){this.toast.error('شماره موبایل برای تکمیل پروفایل الزامی است');return;}
    this.saving.set(true);
    const payload={...this.form, phoneNumber:this.form.phoneNumber.trim()};
    this.http.post<ApiResult>(`${this.apiBase}/Consultant`, payload).subscribe({
      next:(response)=>{
        const id=extractConsultantProfileId(response);
        if(id){this.profileId.set(id);persistConsultantProfileId(id);writeStorage('currentUserPhone',payload.phoneNumber);}
        const isSuccess=response?.isSuccess ?? true;
        const message=response?.message ?? (id ? 'پروفایل مشاور ذخیره شد و شناسه پروفایل در داشبورد ثبت شد' : 'پروفایل مشاور ذخیره شد');
        isSuccess ? this.toast.success(message) : this.toast.error(message);
        this.saving.set(false);
      },
      error:()=>{this.toast.error('ذخیره پروفایل مشاور ناموفق بود');this.saving.set(false);}
    });
  }
}
