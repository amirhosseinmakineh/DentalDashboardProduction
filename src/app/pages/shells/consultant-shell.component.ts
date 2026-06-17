import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../../base/base-layout/base-layout.component';
@Component({selector:'app-consultant-shell', standalone:true, imports:[BaseLayoutComponent], template:`<app-base-layout role="Consultant" title="مشاور" [menu]="menu" />`})
export class ConsultantShellComponent { menu=[{label:'Attendance',path:'/consultant/dashboard',icon:'🟢'},{label:'Leads',path:'/consultant/leads',icon:'☎️'},{label:'Profiles',path:'/consultant/profiles',icon:'👤'},{label:'Reservations',path:'/consultant/reservations',icon:'📅'}]; }
