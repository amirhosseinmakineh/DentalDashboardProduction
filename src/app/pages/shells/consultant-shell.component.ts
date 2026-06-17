import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../../base/base-layout/base-layout.component';
@Component({selector:'app-consultant-shell', standalone:true, imports:[BaseLayoutComponent], template:`<app-base-layout role="consultant" title="Consultant Dashboard" [menu]="menu" />`})
export class ConsultantShellComponent { menu=[{label:'Attendance / Online Status',path:'/consultant/dashboard',icon:'🟢'},{label:'My Leads',path:'/consultant/leads',icon:'☎️'},{label:'Patient Profiles',path:'/consultant/profiles',icon:'👤'},{label:'Reservations',path:'/consultant/reservations',icon:'📅'}]; }
