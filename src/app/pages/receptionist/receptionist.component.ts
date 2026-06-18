import { Component } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
@Component({selector:'app-receptionist', standalone:true, imports:[SidebarComponent], template:`<div class="dashboard"><app-sidebar title="پذیرش" [items]="items"/><section class="panel"><h1>داشبورد پذیرش</h1><article class="card empty-state">اسکلت اولیه پذیرش: صفحات نوبت‌ها، پذیرش و تماس‌ها آماده توسعه هستند.</article></section></div>`})
export class ReceptionistComponent { items=[{label:'نوبت‌ها',path:'/receptionist'},{label:'پذیرش بیمار',path:'/receptionist'},{label:'تماس‌ها',path:'/receptionist'}]; }
