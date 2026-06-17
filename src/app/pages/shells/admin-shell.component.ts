import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../../base/base-layout/base-layout.component';
@Component({selector:'app-admin-shell', standalone:true, imports:[BaseLayoutComponent], template:`<app-base-layout role="admin" title="Admin Dashboard" [menu]="menu" />`})
export class AdminShellComponent { menu=[{label:'User Management',path:'/admin/users',icon:'👥'},{label:'Consultant Management',path:'/admin/consultants',icon:'🧑‍⚕️'},{label:'System Leads Management',path:'/admin/leads',icon:'📋'}]; }
