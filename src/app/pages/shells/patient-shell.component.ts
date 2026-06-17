import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../../base/base-layout/base-layout.component';
@Component({selector:'app-patient-shell', standalone:true, imports:[BaseLayoutComponent], template:`<app-base-layout role="Patient" title="بیمار" [menu]="menu" />`})
export class PatientShellComponent { menu=[{label:'Profile',path:'/patient/profile',icon:'👤'},{label:'Reservations',path:'/patient/reservations',icon:'📅'},{label:'Rating',path:'/patient/rating',icon:'⭐'}]; }
