import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard/components/layout/dashboard-layout.component';
import { ConsultantComponent } from './dashboard/components/consultant/consultant.component';
import { ConsultantLeadManagmentComponent } from './dashboard/components/consultant-lead-managment/consultant-lead-managment.component';
import { ConsultantMainComponent } from './dashboard/components/consultant-main/consultant-main.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard/consultant/main' },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: 'consultant', component: ConsultantComponent },
      { path: 'consultant/main', component: ConsultantMainComponent },
      { path: 'consultant/:profileId/leads', component: ConsultantLeadManagmentComponent },
      { path: 'my-leads', component: ConsultantLeadManagmentComponent }
    ]
  }
];
