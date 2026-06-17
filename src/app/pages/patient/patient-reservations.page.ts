import { Component, inject } from '@angular/core';
import { BaseTableComponent } from '../../base/base-table/base-table.component';
import { BaseToastService } from '../../base/base-toast/base-toast.service';
import { reservations } from '../../shared/mock-data';
@Component({selector:'app-patient-reservations-page',standalone:true,imports:[BaseTableComponent],template:`<section class="screen-stack patient-dashboard"><article class="hero-card"><small>Patient Dashboard</small><h2>My Reservations</h2><p>View and request mock reservations.</p></article><app-base-table [columns]="columns" [rows]="reservations" [filters]="filters" [showEdit]="false" [showDelete]="false" (add)="requestReservation()" /></section>`})
export class PatientReservationsPage{private toast=inject(BaseToastService);reservations=reservations;columns=[{key:'date',label:'Date'},{key:'time',label:'Time'},{key:'consultant',label:'Consultant'},{key:'status',label:'Status'}];filters=[{key:'status',label:'Status',type:'select' as const,options:['Confirmed','Pending']},{key:'date',label:'Date',type:'date' as const}];requestReservation(){this.toast.info('Reservation request saved in mock UI')}}
