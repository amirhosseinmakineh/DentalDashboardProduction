import { Component } from '@angular/core';
import { BaseLayoutComponent, LayoutMenuItem } from '../../base/base-layout/base-layout.component';
@Component({selector:'app-consultant-shell', standalone:true, imports:[BaseLayoutComponent], template:`<app-base-layout role="مشاور" title="داشبورد مشاور" [menu]="menu" />`})
export class ConsultantShellComponent { menu: LayoutMenuItem[]=[{label:'حضور / وضعیت آنلاین',path:'/consultant/dashboard',icon:'fa-solid fa-circle-check'},{label:'لیدهای من',path:'/consultant/leads',icon:'fa-solid fa-phone-volume'},{label:'تکمیل پروفایل',path:'/consultant/profiles',icon:'fa-solid fa-id-card'},{label:'رزروها',path:'/consultant/reservations',icon:'fa-solid fa-calendar-check'}]; }
