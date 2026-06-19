import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BaseToastService } from '../../base/base-toast/base-toast.service';
import { currentConsultantProfileId, extractConsultantProfileId, persistConsultantProfileId } from '../../core/consultant-profile-context';

type ConsultantCompleteProfileResponse = number | string | { id?: number | string; profileId?: number | string; data?: unknown; result?: unknown };
interface ConsultantProfileForm { nationalityCode: string; address: string; isCompleteProfile: boolean; }

@Component({
  selector:'app-consultant-profiles-page',
  standalone:true,
  imports:[NgIf, FormsModule],
  template:`<section class="screen-stack consultant-dashboard">
    <article class="hero-card"><small>داشبورد مشاور</small><h2>تکمیل پروفایل مشاور</h2><p>اطلاعات کاری خود را تکمیل کنید تا دسترسی به حضور، آنلاین شدن و لیدها فعال شود.</p></article>
    <section class="table-card">
      <div class="state-card">وضعیت پروفایل: <strong>{{ profileId() ? 'تکمیل شده' : 'نیازمند تکمیل' }}</strong></div>
      <form class="form-grid" (ngSubmit)="saveProfile()">
        <input class="control" name="nationalityCode" [(ngModel)]="form.nationalityCode" placeholder="کد ملی" required />
        <textarea class="control" name="address" [(ngModel)]="form.address" placeholder="آدرس" required></textarea>
        <button class="btn primary" type="submit" [disabled]="saving()">تکمیل پروفایل مشاور</button>
      </form>
      <p *ngIf="profileId()" class="state-card">پروفایل شما آماده است؛ اکنون می‌توانید حضور خود را ثبت کنید و لیدهای خود را ببینید.</p>
    </section>
  </section>`
})
export class ConsultantProfilesPage {
  private readonly http=inject(HttpClient); private readonly toast=inject(BaseToastService); private readonly apiBase='http://localhost:5182/api';
  readonly profileId=signal(currentConsultantProfileId()); readonly saving=signal(false);
  form: ConsultantProfileForm = { nationalityCode: '', address: '', isCompleteProfile: true };

  saveProfile(){
    if(!this.form.nationalityCode.trim() || !this.form.address.trim()){this.toast.error('کد ملی و آدرس برای تکمیل پروفایل الزامی است');return;}
    this.saving.set(true);
    const payload={nationalityCode:this.form.nationalityCode.trim(),address:this.form.address.trim(),isCompleteProfile:true};
    this.http.post<ConsultantCompleteProfileResponse>(`${this.apiBase}/Consultant`, payload).subscribe({
      next:(response)=>{
        const id=typeof response==='number'||typeof response==='string'?Number(response):extractConsultantProfileId(response);
        if(id>0){this.profileId.set(id);persistConsultantProfileId(id);this.toast.success('پروفایل مشاور با موفقیت تکمیل شد');}
        else this.toast.error('تکمیل پروفایل ناموفق بود؛ لطفاً دوباره تلاش کنید');
        this.saving.set(false);
      },
      error:()=>{this.toast.error('تکمیل پروفایل مشاور ناموفق بود');this.saving.set(false);}
    });
  }
}
