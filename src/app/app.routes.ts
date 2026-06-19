import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ServicePageComponent } from './pages/landing/service-page.component';
import { AdminShellComponent } from './pages/shells/admin-shell.component';
import { ConsultantShellComponent } from './pages/shells/consultant-shell.component';
import { PatientShellComponent } from './pages/shells/patient-shell.component';
import { AdminUsersPage } from './pages/admin/admin-users.page';
import { AdminConsultantsPage } from './pages/admin/admin-consultants.page';
import { AdminLeadsPage } from './pages/admin/admin-leads.page';
import { AdminConsultantLeadsPage } from './pages/admin/admin-consultant-leads.page';
import { AdminConsultantAttendancePage } from './pages/admin/admin-consultant-attendance.page';
import { ConsultantAttendancePage } from './pages/consultant/consultant-attendance.page';
import { ConsultantLeadsPage } from './pages/consultant/consultant-leads.page';
import { ConsultantProfilesPage } from './pages/consultant/consultant-profiles.page';
import { ConsultantReservationsPage } from './pages/consultant/consultant-reservations.page';
import { PatientProfilePage } from './pages/patient/patient-profile.page';
import { PatientReservationsPage } from './pages/patient/patient-reservations.page';
import { PatientRatingPage } from './pages/patient/patient-rating.page';
import { consultantProfileGuard, roleGuard } from './core/auth-context';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'services/:slug', component: ServicePageComponent },
  { path: 'admin', component: AdminShellComponent, canActivate: [roleGuard(['Admin'])], children: [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', component: AdminUsersPage },
    { path: 'consultants', component: AdminConsultantsPage },
    { path: 'leads', component: AdminLeadsPage },
    { path: 'consultants/:consultantId/leads', component: AdminConsultantLeadsPage },
    { path: 'consultants/:consultantId/attendance', component: AdminConsultantAttendancePage }
  ]},
  { path: 'consultant', component: ConsultantShellComponent, canActivate: [roleGuard(['Consultant'])], canActivateChild: [consultantProfileGuard], children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: ConsultantAttendancePage },
    { path: 'leads', component: ConsultantLeadsPage },
    { path: 'profiles', component: ConsultantProfilesPage },
    { path: 'reservations', component: ConsultantReservationsPage }
  ]},
  { path: 'patient', component: PatientShellComponent, canActivate: [roleGuard(['Patient'])], children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    { path: 'profile', component: PatientProfilePage },
    { path: 'reservations', component: PatientReservationsPage },
    { path: 'rating', component: PatientRatingPage }
  ]}
];
