import { Component, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { BaseTableComponent } from '../../base/base-table/base-table.component';
import { BaseDialogComponent } from '../../base/base-dialog/base-dialog.component';
import { appointments } from '../../shared/mock-data';
@Component({selector:'app-patient', standalone:true, imports:[SidebarComponent, BaseTableComponent, BaseDialogComponent, NgFor], template:`<div class="dashboard"><app-sidebar title="Patient" [items]="items"/><section class="panel"><h1>Patient Dashboard</h1><article class="card profile"><h2>پروفایل بیمار</h2><p>نام: نگار سعیدی</p><p>موبایل: 09126667777</p><p>پرونده: Readonly mock profile</p></article><h2>Appointments</h2><app-base-table [columns]="cols" [rows]="appointments" [actions]="{edit:false,delete:false}" [customActions]="[{icon:'⭐',label:'Rate Consultant',onClick:rate}]" (add)="rate()"/></section></div><app-base-dialog [open]="rating()" title="امتیاز به مشاور" (closed)="rating.set(false)"><div class="stars"><button *ngFor="let s of [1,2,3,4,5]">★ {{s}}</button></div></app-base-dialog>`})
export class PatientComponent { items=[{label:'Profile',path:'/patient'},{label:'Appointments',path:'/patient'}]; appointments=appointments; rating=signal(false); cols=[{key:'date',label:'تاریخ'},{key:'time',label:'ساعت'},{key:'consultant',label:'مشاور'}]; rate=()=>this.rating.set(true); }
