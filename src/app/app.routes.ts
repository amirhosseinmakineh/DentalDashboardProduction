import { DashboardLayoutComponent } from './components/dashboard-layout.component/dashboard-layout.component.component';
import { ConsultantComponent } from './components/dashboards/consultant/consultant.component';
import { Routes } from '@angular/router';
import { ConsultantMainComponent } from './dashboard/components/consultant-main/consultant-main.component';
import { ConsultantLeadManagmentComponent } from './dashboard/components/consultant-lead-managment/consultant-lead-managment.component';
import { ConsultantAttendanceManagmentComponent } from './components/dashboards/consultantAttendanceManagment/consultantAttendanceManagment.component';
import { ConsultantScoreLogManagmentComponent } from './components/dashboards/consultantScoreLogManagment/consultantScoreLogManagment.component';
import { LandingComponent } from './components/Landing/Landing.component';
export const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingComponent },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'consultant/main' },
      { path: 'userManagement', loadComponent: () => import('./components/dashboards/userManagement/userManagement.component').then((m) => m.UserManagementComponent) },
      { path: 'consultant', component: ConsultantComponent },
      { path: 'consultant/main', component: ConsultantMainComponent },
      { path: 'consultant/:profileId/leads', component: ConsultantLeadManagmentComponent },
      { path: 'consultant/:profileId/attendances', component: ConsultantAttendanceManagmentComponent },
      { path: 'consultant/:profileId/scores', component: ConsultantScoreLogManagmentComponent },
      { path: 'my-leads', component: ConsultantLeadManagmentComponent }
    ]
  }
];
