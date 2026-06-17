import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../../base/base-layout/base-layout.component';
@Component({selector:'app-consultant-shell', standalone:true, imports:[BaseLayoutComponent], template:`<app-base-layout role="مشاور" title="داشبورد مشاور" [menu]="menu" />`})
export class ConsultantShellComponent { menu=[{label:'حضور / وضعیت آنلاین',path:'/consultant/dashboard',icon:'🟢'},{label:'لیدهای من',path:'/consultant/leads',icon:'☎️'},{label:'پرونده‌های بیماران',path:'/consultant/profiles',icon:'👤'},{label:'رزروها',path:'/consultant/reservations',icon:'📅'}]; }
