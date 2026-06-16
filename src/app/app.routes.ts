import { Routes } from '@angular/router';

import { LandingComponent } from './components/Landing/Landing.component';
import { DashboardLayoutComponent } from './components/dashboard-layout.component/dashboard-layout.component.component';

import { UserManagementComponent } from './components/dashboards/userManagement/userManagement.component';
import { ConsultantComponent } from './components/dashboards/consultant/consultant.component';
import { ConsultantLeadManagmentComponent } from './components/dashboards/consultantLeadManagment/consultantLeadManagment.component';
import { ConsultantScoreLogManagmentComponent } from './components/dashboards/consultantScoreLogManagment/consultantScoreLogManagment.component';
import { ConsultantAttendanceManagmentComponent } from './components/dashboards/consultantAttendanceManagment/consultantAttendanceManagment.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'userManagement',
        pathMatch: 'full'
      },
      {
        path: 'userManagement',
        component: UserManagementComponent
      },
      {
        path: 'consultant',
        component: ConsultantComponent
      },
      {
        path: 'consultant/:profileId/leads',
        component: ConsultantLeadManagmentComponent
      },
      {
        path: 'consultant/:profileId/attendances',
        component: ConsultantAttendanceManagmentComponent
      },
      {
        path: 'consultant/:profileId/scores',
        component: ConsultantScoreLogManagmentComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
