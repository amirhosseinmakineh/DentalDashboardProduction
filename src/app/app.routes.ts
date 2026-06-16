import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard/components/layout/dashboard-layout.component';
import { ConsultantComponent } from './dashboard/components/consultant/consultant.component';
import { ConsultantAttendanceManagmentComponent } from './dashboard/components/consultant-attendance-managment/consultant-attendance-managment.component';
import { ConsultantLeadManagmentComponent } from './dashboard/components/consultant-lead-managment/consultant-lead-managment.component';
import { ConsultantMainComponent } from './dashboard/components/consultant-main/consultant-main.component';
import { ConsultantScoreLogManagmentComponent } from './dashboard/components/consultant-score-log-managment/consultant-score-log-managment.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard/consultant/main' },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: 'userManagement', loadComponent: () => import('./dashboard/components/user-management/user-management.component').then((m) => m.UserManagementComponent) },
      { path: 'consultant', component: ConsultantComponent },
      { path: 'consultant/main', component: ConsultantMainComponent },
      { path: 'consultant/:profileId/leads', component: ConsultantLeadManagmentComponent },
      { path: 'consultant/:profileId/attendances', component: ConsultantAttendanceManagmentComponent },
      { path: 'consultant/:profileId/scores', component: ConsultantScoreLogManagmentComponent },
      { path: 'my-leads', component: ConsultantLeadManagmentComponent }
    ]
  }
];
