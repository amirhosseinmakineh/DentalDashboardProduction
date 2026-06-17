import { Component, inject, signal } from '@angular/core';
import { BaseTableComponent, TableAction } from '../../base/base-table/base-table.component';
import { BaseDialogComponent } from '../../base/base-dialog/base-dialog.component';
import { BaseDatePickerComponent } from '../../base/base-date-picker/base-date-picker.component';
import { BaseToastService } from '../../base/base-toast/base-toast.service';
import { consultants, leads, users } from '../../shared/mock-data';

@Component({selector:'app-admin', standalone:true, imports:[BaseTableComponent, BaseDialogComponent, BaseDatePickerComponent], template:`
  <section class="screen-stack"><div class="hero-card"><small>Admin</small><h2>مدیریت سیستم</h2><p>CRUD نمایشی با داده Mock و دیالوگ‌های مشترک.</p></div>
  <app-base-table [columns]="userCols" [rows]="users" [filters]="userFilters" (add)="open('افزودن کاربر')" (edit)="open('ویرایش کاربر')" (delete)="remove()" />
  <app-base-table [columns]="consultantCols" [rows]="consultants" [filters]="consultantFilters" (add)="open('افزودن مشاور')" />
  <app-base-table [columns]="leadCols" [rows]="leads" [filters]="leadFilters" [customActions]="leadActions" (add)="open('افزودن لید')" /></section>
  <app-base-dialog [open]="!!dialog()" [title]="dialog()" (closed)="dialog.set('')" (confirm)="save()"><div class="form-grid"><input class="control" placeholder="نام"/><input class="control" placeholder="موبایل"/><select class="control"><option>Active</option><option>Pending</option></select><app-base-date-picker /></div></app-base-dialog>`})
export class AdminComponent { private toast=inject(BaseToastService); users=users; consultants=consultants; leads=leads; dialog=signal(''); userCols=[{key:'name',label:'نام'},{key:'phone',label:'موبایل'},{key:'role',label:'نقش'},{key:'status',label:'وضعیت'}]; consultantCols=[{key:'name',label:'نام'},{key:'phone',label:'موبایل'},{key:'specialty',label:'تخصص'},{key:'status',label:'وضعیت'}]; leadCols=[{key:'name',label:'نام'},{key:'phone',label:'تلفن'},{key:'status',label:'وضعیت'},{key:'assigned',label:'مشاور'}]; userFilters=[{key:'role',label:'نقش',type:'select' as const,options:['Patient','Consultant','Admin']}]; consultantFilters=[{key:'status',label:'وضعیت',type:'select' as const,options:['Online','Present']}]; leadFilters=[{key:'status',label:'وضعیت',type:'select' as const,options:['New','Called']}]; leadActions:TableAction[]=[{icon:'☎️',label:'تماس',onClick:()=>this.toast.info('تماس نمایشی ثبت شد')},{icon:'👤',label:'Assign Lead',onClick:()=>this.open('تخصیص لید')}]; open(title:string){this.dialog.set(title)} save(){this.toast.success('اطلاعات به صورت mock ذخیره شد'); this.dialog.set('')} remove(){this.toast.warning('حذف نمایشی انجام شد')} }
