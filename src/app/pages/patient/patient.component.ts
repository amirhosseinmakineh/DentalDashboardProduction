import { Component, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { BaseTableComponent } from '../../base/base-table/base-table.component';
import { BaseDialogComponent } from '../../base/base-dialog/base-dialog.component';
import { BaseToastService } from '../../base/base-toast/base-toast.service';
import { reservations } from '../../shared/mock-data';
@Component({selector:'app-patient', standalone:true, imports:[NgFor, BaseTableComponent, BaseDialogComponent], template:`<section class="screen-stack"><article class="hero-card"><small>Patient Profile</small><h2>نگار سعیدی</h2><p>09126667777 · پرونده نمایشی readonly</p></article><app-base-table [columns]="cols" [rows]="reservations" [filters]="filters" [showEdit]="false" [showDelete]="false" [customActions]="[{icon:'⭐',label:'Rate consultant',onClick:rate}]" (add)="rating.set(true)" /></section><app-base-dialog [open]="rating()" title="امتیاز به مشاور" (closed)="rating.set(false)" (confirm)="save()"><div class="stars"><button *ngFor="let s of [1,2,3,4,5]" type="button">★ {{s}}</button></div></app-base-dialog>`})
export class PatientComponent { private toast=inject(BaseToastService); reservations=reservations; rating=signal(false); cols=[{key:'date',label:'تاریخ'},{key:'time',label:'ساعت'},{key:'consultant',label:'مشاور'},{key:'status',label:'وضعیت'}]; filters=[{key:'status',label:'وضعیت',type:'select' as const,options:['Confirmed','Pending']}]; rate=()=>this.rating.set(true); save(){this.toast.success('امتیاز شما ثبت شد'); this.rating.set(false)} }
