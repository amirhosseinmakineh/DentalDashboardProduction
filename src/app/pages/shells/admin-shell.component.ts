import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../../base/base-layout/base-layout.component';
@Component({selector:'app-admin-shell', standalone:true, imports:[BaseLayoutComponent], template:`<app-base-layout role="مدیر" title="داشبورد مدیر" [menu]="menu" />`})
export class AdminShellComponent { menu=[{label:'مدیریت کاربران',path:'/admin/users',icon:'👥'},{label:'مشاهده مشاوران',path:'/admin/consultants',icon:'🧑‍⚕️'},{label:'لیدهای assign شده',path:'/admin/consultant-leads',icon:'📌'},{label:'حضور و غیاب مشاوران',path:'/admin/consultant-attendance',icon:'🕒'},{label:'لیدهای سیستم',path:'/admin/leads',icon:'📋'}]; }
