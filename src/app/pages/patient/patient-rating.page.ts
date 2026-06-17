import { Component, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { BaseDialogComponent } from '../../base/base-dialog/base-dialog.component';
import { BaseToastService } from '../../base/base-toast/base-toast.service';
@Component({selector:'app-patient-rating-page',standalone:true,imports:[NgFor,BaseDialogComponent],template:`<section class="screen-stack patient-dashboard"><article class="hero-card"><small>داشبورد بیمار</small><h2>امتیازدهی به مشاور</h2><p>بعد از نوبت انجام‌شده به مشاور خود امتیاز دهید.</p></article><article class="state-card"><h3>ثبت بازخورد</h3><p>برای باز کردن فرم امتیازدهی، دکمه را لمس کنید.</p><button class="btn primary" (click)="rating.set(true)">ثبت امتیاز مشاور</button></article></section><app-base-dialog [open]="rating()" title="امتیازدهی به مشاور" (closed)="rating.set(false)" (confirm)="save()"><div class="stars"><button *ngFor="let s of [1,2,3,4,5]" type="button">★ {{s}}</button></div></app-base-dialog>`})
export class PatientRatingPage{private toast=inject(BaseToastService);rating=signal(false);save(){this.toast.success('امتیاز در رابط نمایشی ذخیره شد');this.rating.set(false)}}
