import { Component, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { BaseTableComponent } from '../../base/base-table/base-table.component';
import { BaseDialogComponent } from '../../base/base-dialog/base-dialog.component';
import { BaseToastService } from '../../base/base-toast/base-toast.service';
import { reservations } from '../../shared/mock-data';
@Component({selector:'app-patient', standalone:true, imports:[NgFor, BaseTableComponent, BaseDialogComponent], template:`
<section class="screen-stack patient-dashboard">
  <article class="hero-card"><small>Patient Dashboard</small><h2>{{ pageTitle() }}</h2><p>{{ pageDescription() }}</p></article>
  @if (section() === 'profile') {
    <article class="state-card profile-card"><h3>نگار سعیدی</h3><p>09126667777 · پرونده نمایشی readonly</p><div class="profile-grid"><span>درمان فعال: ارتودنسی</span><span>مشاور: دکتر محمدی</span><span>آخرین مراجعه: 1403/05/12</span></div></article>
  } @else if (section() === 'reservations') {
    <app-base-table [columns]="cols" [rows]="reservations" [filters]="filters" [showEdit]="false" [showDelete]="false" (add)="toast.info('درخواست رزرو نمایشی ثبت شد')" />
  } @else {
    <article class="state-card"><h3>امتیاز به مشاور</h3><p>بعد از هر مراجعه می‌توانید کیفیت مشاوره را ثبت کنید.</p><button class="btn primary" (click)="rating.set(true)">ثبت امتیاز جدید</button></article>
  }
</section><app-base-dialog [open]="rating()" title="امتیاز به مشاور" (closed)="rating.set(false)" (confirm)="save()"><div class="stars"><button *ngFor="let s of [1,2,3,4,5]" type="button">★ {{s}}</button></div></app-base-dialog>`})
export class PatientComponent { toast=inject(BaseToastService); private router=inject(Router); reservations=reservations; rating=signal(false); cols=[{key:'date',label:'تاریخ'},{key:'time',label:'ساعت'},{key:'consultant',label:'مشاور'},{key:'status',label:'وضعیت'}]; filters=[{key:'status',label:'وضعیت',type:'select' as const,options:['Confirmed','Pending']}]; section(){return this.router.url.includes('/reservations')?'reservations':this.router.url.includes('/rating')?'rating':'profile'} pageTitle(){return this.section()==='profile'?'پروفایل بیمار':this.section()==='reservations'?'رزروهای من':'امتیازدهی'} pageDescription(){return this.section()==='profile'?'مشاهده اطلاعات پرونده و درمان فعال.':this.section()==='reservations'?'مشاهده وضعیت نوبت‌ها و رزروها.':'ثبت بازخورد و امتیاز برای مشاور.'} save(){this.toast.success('امتیاز شما ثبت شد'); this.rating.set(false)} }
