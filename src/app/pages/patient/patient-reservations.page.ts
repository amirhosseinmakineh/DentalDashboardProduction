import { Component, inject } from '@angular/core';
import { BaseTableComponent } from '../../base/base-table/base-table.component';
import { BaseToastService } from '../../base/base-toast/base-toast.service';
import { reservations } from '../../shared/mock-data';
@Component({selector:'app-patient-reservations-page',standalone:true,imports:[BaseTableComponent],template:`<section class="screen-stack patient-dashboard"><article class="hero-card"><small>داشبورد بیمار</small><h2>رزروهای من</h2><p>رزروهای نمایشی را ببینید و درخواست رزرو ثبت کنید.</p></article><app-base-table [columns]="columns" [rows]="reservations" [filters]="filters" [showEdit]="false" [showDelete]="false" (add)="requestReservation()" /></section>`})
export class PatientReservationsPage{private toast=inject(BaseToastService);reservations=reservations;columns=[{key:'date',label:'تاریخ'},{key:'time',label:'ساعت'},{key:'consultant',label:'مشاور'},{key:'status',label:'وضعیت'}];filters=[{key:'status',label:'وضعیت',type:'select' as const,options:['تاییدشده','در انتظار']},{key:'date',label:'تاریخ',type:'date' as const}];requestReservation(){this.toast.info('درخواست رزرو در رابط نمایشی ذخیره شد')}}
