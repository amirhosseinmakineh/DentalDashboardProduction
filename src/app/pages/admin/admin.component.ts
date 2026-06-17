import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BaseTableComponent, TableAction } from '../../base/base-table/base-table.component';
import { BaseDialogComponent } from '../../base/base-dialog/base-dialog.component';
import { BaseDatePickerComponent } from '../../base/base-date-picker/base-date-picker.component';
import { BaseToastService } from '../../base/base-toast/base-toast.service';
import { consultants, leads, users } from '../../shared/mock-data';

@Component({selector:'app-admin', standalone:true, imports:[BaseTableComponent, BaseDialogComponent, BaseDatePickerComponent], template:`
  <section class="screen-stack admin-dashboard">
    <div class="hero-card"><small>داشبورد مدیر</small><h2>{{ pageTitle() }}</h2><p>{{ pageDescription() }}</p></div>

    @if (section() === 'users') {
      <app-base-table [columns]="userCols" [rows]="users" [filters]="userFilters" (add)="open('افزودن کاربر')" (edit)="open('ویرایش کاربر')" (delete)="remove()" />
    } @else if (section() === 'consultants') {
      <app-base-table [columns]="consultantCols" [rows]="consultants" [filters]="consultantFilters" (add)="open('افزودن مشاور')" (edit)="open('ویرایش مشاور')" (delete)="remove()" />
    } @else {
      <app-base-table [columns]="leadCols" [rows]="leads" [filters]="leadFilters" [customActions]="leadActions" (add)="open('افزودن لید')" (edit)="open('ویرایش لید')" (delete)="remove()" />
    }
  </section>
  <app-base-dialog [open]="!!dialog()" [title]="dialog()" (closed)="dialog.set('')" (confirm)="save()"><div class="form-grid"><input class="control" placeholder="نام"/><input class="control" placeholder="موبایل"/><select class="control"><option>فعال</option><option>در انتظار</option></select><app-base-date-picker /></div></app-base-dialog>`})
export class AdminComponent { private toast=inject(BaseToastService); private router=inject(Router); users=users; consultants=consultants; leads=leads; dialog=signal(''); userCols=[{key:'name',label:'نام'},{key:'phone',label:'موبایل'},{key:'role',label:'نقش'},{key:'status',label:'وضعیت'}]; consultantCols=[{key:'name',label:'نام'},{key:'phone',label:'موبایل'},{key:'specialty',label:'تخصص'},{key:'status',label:'وضعیت'}]; leadCols=[{key:'name',label:'نام'},{key:'phone',label:'تلفن'},{key:'status',label:'وضعیت'},{key:'assigned',label:'مشاور'}]; userFilters=[{key:'role',label:'نقش',type:'select' as const,options:['بیمار','مشاور','مدیر']}]; consultantFilters=[{key:'status',label:'وضعیت',type:'select' as const,options:['آنلاین','حاضر']}]; leadFilters=[{key:'status',label:'وضعیت',type:'select' as const,options:['جدید','تماس گرفته']}]; leadActions:TableAction[]=[{icon:'☎️',label:'تماس',onClick:()=>this.toast.info('تماس نمایشی ثبت شد')},{icon:'👤',label:'تخصیص لید',onClick:()=>this.open('تخصیص لید')}]; section(){return this.router.url.includes('/consultants')?'consultants':this.router.url.includes('/leads')?'leads':'users'} pageTitle(){return this.section()==='users'?'مدیریت کاربران':this.section()==='consultants'?'مدیریت مشاوران':'مدیریت لیدها'} pageDescription(){return this.section()==='users'?'ساخت، ویرایش و حذف کاربران سیستم.':this.section()==='consultants'?'تعریف مشاور، تخصص و وضعیت حضور.':'مشاهده، فیلتر و تخصیص لیدها به مشاوران.'} open(title:string){this.dialog.set(title)} save(){this.toast.success('اطلاعات به صورت نمایشی ذخیره شد'); this.dialog.set('')} remove(){this.toast.warning('حذف نمایشی انجام شد')} }
