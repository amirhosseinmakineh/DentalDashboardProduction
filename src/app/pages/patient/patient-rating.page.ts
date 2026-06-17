import { Component, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { BaseDialogComponent } from '../../base/base-dialog/base-dialog.component';
import { BaseToastService } from '../../base/base-toast/base-toast.service';
@Component({selector:'app-patient-rating-page',standalone:true,imports:[NgFor,BaseDialogComponent],template:`<section class="screen-stack patient-dashboard"><article class="hero-card"><small>Patient Dashboard</small><h2>Consultant Rating</h2><p>Rate your consultant after a completed reservation.</p></article><article class="state-card"><h3>Share feedback</h3><p>Tap the button to open a mobile bottom-sheet dialog.</p><button class="btn primary" (click)="rating.set(true)">Add Consultant Rating</button></article></section><app-base-dialog [open]="rating()" title="Consultant Rating" (closed)="rating.set(false)" (confirm)="save()"><div class="stars"><button *ngFor="let s of [1,2,3,4,5]" type="button">★ {{s}}</button></div></app-base-dialog>`})
export class PatientRatingPage{private toast=inject(BaseToastService);rating=signal(false);save(){this.toast.success('Rating saved in mock UI');this.rating.set(false)}}
