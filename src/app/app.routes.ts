import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ConsultantComponent } from './pages/consultant/consultant.component';
import { PatientComponent } from './pages/patient/patient.component';
import { AdminShellComponent } from './pages/shells/admin-shell.component';
import { ConsultantShellComponent } from './pages/shells/consultant-shell.component';
import { PatientShellComponent } from './pages/shells/patient-shell.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'admin', component: AdminShellComponent, children: [
    { path: '', redirectTo: 'users', pathMatch: 'full' }, { path: 'users', component: AdminComponent }, { path: 'consultants', component: AdminComponent }, { path: 'leads', component: AdminComponent }
  ]},
  { path: 'consultant', component: ConsultantShellComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, { path: 'dashboard', component: ConsultantComponent }, { path: 'leads', component: ConsultantComponent }, { path: 'profiles', component: ConsultantComponent }, { path: 'reservations', component: ConsultantComponent }
  ]},
  { path: 'patient', component: PatientShellComponent, children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full' }, { path: 'profile', component: PatientComponent }, { path: 'reservations', component: PatientComponent }, { path: 'rating', component: PatientComponent }
  ]}
];
