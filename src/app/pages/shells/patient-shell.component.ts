import { Component } from '@angular/core';
import { BaseLayoutComponent, LayoutMenuItem } from '../../base/base-layout/base-layout.component';
@Component({selector:'app-patient-shell', standalone:true, imports:[BaseLayoutComponent], template:`<app-base-layout role="بیمار" title="داشبورد بیمار" [menu]="menu" />`})
export class PatientShellComponent { menu: LayoutMenuItem[]=[{label:'پروفایل من',path:'/patient/profile',icon:'fa-solid fa-user'},{label:'رزروهای من',path:'/patient/reservations',icon:'fa-solid fa-calendar-days'},{label:'امتیازدهی به مشاور',path:'/patient/rating',icon:'fa-solid fa-star'}]; }
