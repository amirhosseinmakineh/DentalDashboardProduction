import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AdminShellComponent } from './pages/shells/admin-shell.component';
import { ConsultantShellComponent } from './pages/shells/consultant-shell.component';
import { PatientShellComponent } from './pages/shells/patient-shell.component';
import { AdminUsersPage } from './pages/admin/admin-users.page';
import { AdminConsultantsPage } from './pages/admin/admin-consultants.page';
import { AdminLeadsPage } from './pages/admin/admin-leads.page';
import { ConsultantAttendancePage } from './pages/consultant/consultant-attendance.page';
import { ConsultantLeadsPage } from './pages/consultant/consultant-leads.page';
import { ConsultantProfilesPage } from './pages/consultant/consultant-profiles.page';
import { ConsultantReservationsPage } from './pages/consultant/consultant-reservations.page';
import { PatientProfilePage } from './pages/patient/patient-profile.page';
import { PatientReservationsPage } from './pages/patient/patient-reservations.page';
import { PatientRatingPage } from './pages/patient/patient-rating.page';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'admin', component: AdminShellComponent, children: [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', component: AdminUsersPage },
    { path: 'consultants', component: AdminConsultantsPage },
    { path: 'leads', component: AdminLeadsPage }
  ]},
  { path: 'consultant', component: ConsultantShellComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: ConsultantAttendancePage },
    { path: 'leads', component: ConsultantLeadsPage },
    { path: 'profiles', component: ConsultantProfilesPage },
    { path: 'reservations', component: ConsultantReservationsPage }
  ]},
  { path: 'patient', component: PatientShellComponent, children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    { path: 'profile', component: PatientProfilePage },
    { path: 'reservations', component: PatientReservationsPage },
    { path: 'rating', component: PatientRatingPage }
  ]}
];
