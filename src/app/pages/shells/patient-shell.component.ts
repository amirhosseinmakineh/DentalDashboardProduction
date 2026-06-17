import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../../base/base-layout/base-layout.component';
@Component({selector:'app-patient-shell', standalone:true, imports:[BaseLayoutComponent], template:`<app-base-layout role="patient" title="Patient Dashboard" [menu]="menu" />`})
export class PatientShellComponent { menu=[{label:'My Profile',path:'/patient/profile',icon:'👤'},{label:'My Reservations',path:'/patient/reservations',icon:'📅'},{label:'Consultant Rating',path:'/patient/rating',icon:'⭐'}]; }
