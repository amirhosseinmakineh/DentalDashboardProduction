import { Component } from '@angular/core';
import { BaseLayoutComponent, LayoutMenuItem } from '../../base/base-layout/base-layout.component';
@Component({selector:'app-admin-shell', standalone:true, imports:[BaseLayoutComponent], template:`<app-base-layout role="مدیر" title="داشبورد مدیر" [menu]="menu" />`})
export class AdminShellComponent { menu: LayoutMenuItem[]=[{label:'مدیریت کاربران',path:'/admin/users',icon:'fa-solid fa-users-gear'},{label:'مدیریت مشاوران',path:'/admin/consultants',icon:'fa-solid fa-user-doctor'},{label:'مشاهده لیدهای سیستم',path:'/admin/leads',icon:'fa-solid fa-list-check'}]; }
