import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../../base/base-layout/base-layout.component';
@Component({selector:'app-admin-shell', standalone:true, imports:[BaseLayoutComponent], template:`<app-base-layout role="Admin" title="مدیریت" [menu]="menu" />`})
export class AdminShellComponent { menu=[{label:'Users',path:'/admin/users',icon:'👥'},{label:'Consultants',path:'/admin/consultants',icon:'🧑‍⚕️'},{label:'Leads',path:'/admin/leads',icon:'📋'}]; }
