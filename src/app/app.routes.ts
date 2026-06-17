import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ConsultantComponent } from './pages/consultant/consultant.component';
import { PatientComponent } from './pages/patient/patient.component';
import { ReceptionistComponent } from './pages/receptionist/receptionist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'consultant', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'consultant', component: ConsultantComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'receptionist', component: ReceptionistComponent },
];
