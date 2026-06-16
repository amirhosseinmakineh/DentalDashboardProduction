import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({ selector: 'app-consultant', standalone: true, template: `<h1 dir="rtl">مشاوران</h1><p dir="rtl">برای مدیریت لیدها از مسیر /dashboard/consultant/:profileId/leads استفاده کنید.</p>` })
export class ConsultantComponent {
  constructor(private readonly router: Router) {}
  leadManagement(profileId: number): void { this.router.navigate(['/dashboard/consultant', profileId, 'leads']); }
  scoreManagement(profileId: number): void { this.router.navigate(['/dashboard/consultant', profileId, 'scores']); }
  attendanceManagement(profileId: number): void { this.router.navigate(['/dashboard/consultant', profileId, 'attendances']); }
}
