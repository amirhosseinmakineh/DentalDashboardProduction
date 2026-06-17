import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../../base/base-layout/base-layout.component';
@Component({selector:'app-patient-shell', standalone:true, imports:[BaseLayoutComponent], template:`<app-base-layout role="بیمار" title="داشبورد بیمار" [menu]="menu" />`})
export class PatientShellComponent { menu=[{label:'پروفایل من',path:'/patient/profile',icon:'👤'},{label:'رزروهای من',path:'/patient/reservations',icon:'📅'},{label:'امتیازدهی به مشاور',path:'/patient/rating',icon:'⭐'}]; }
