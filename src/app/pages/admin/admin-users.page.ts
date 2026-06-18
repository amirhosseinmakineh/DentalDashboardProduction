import { Component, inject, signal } from '@angular/core';
import { BaseTableComponent } from '../../base/base-table/base-table.component';
import { BaseDialogComponent } from '../../base/base-dialog/base-dialog.component';
import { BaseDatePickerComponent } from '../../base/base-date-picker/base-date-picker.component';
import { BaseToastService } from '../../base/base-toast/base-toast.service';
import { users } from '../../shared/mock-data';

@Component({
  selector: 'app-admin-users-page',
  standalone: true,
  imports: [BaseTableComponent, BaseDialogComponent, BaseDatePickerComponent],
  template: `
    <section class="screen-stack admin-dashboard">
      <article class="hero-card"><small>داشبورد مدیر</small><h2>مدیریت کاربران</h2><p>ساخت، ویرایش، فیلتر و بررسی کاربران نمایشی داشبورد.</p></article>
      <app-base-table [columns]="columns" [rows]="users" [filters]="filters" (add)="open('افزودن کاربر')" (edit)="open('ویرایش کاربر')" (delete)="remove()" />
    </section>
    <app-base-dialog [open]="!!dialog()" [title]="dialog()" [confirmLabel]="dialog()==='ویرایش کاربر' ? 'ذخیره تغییرات کاربر' : 'ایجاد کاربر'" (closed)="dialog.set('')" (confirm)="save()">
      <div class="form-grid"><input class="control" placeholder="نام کامل کاربر"/><input class="control" placeholder="شماره موبایل"/><select class="control"><option>بیمار</option><option>مشاور</option><option>مدیر</option></select><select class="control"><option>فعال</option><option>در انتظار</option><option>غیرفعال</option></select><app-base-date-picker [label]="dialog()==='ویرایش کاربر' ? 'تاریخ آخرین بروزرسانی' : 'تاریخ ایجاد'" /></div>
    </app-base-dialog>`
})
export class AdminUsersPage { private toast = inject(BaseToastService); users = users; dialog = signal(''); columns = [{key:'name',label:'نام'},{key:'phone',label:'موبایل'},{key:'role',label:'نقش'},{key:'status',label:'وضعیت'}]; filters = [{key:'role',label:'نقش',type:'select' as const,options:['بیمار','مشاور','مدیر']},{key:'status',label:'وضعیت',type:'select' as const,options:['فعال','در انتظار']}]; open(title: string){this.dialog.set(title)} save(){this.toast.success(`${this.dialog()} با موفقیت ثبت شد`); this.dialog.set('')} remove(){this.toast.warning('کاربر در رابط نمایشی حذف شد')} }
