import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `<main class="dashboard" dir="rtl"><aside><h1>DentalDashboard</h1><a routerLink="/dashboard/consultant/main">وضعیت مشاور</a><a routerLink="/dashboard/my-leads">لیدهای من</a><a routerLink="/dashboard/consultant">مشاوران</a></aside><section><router-outlet></router-outlet></section></main>`,
  styles: [`.dashboard{min-height:100vh;display:grid;grid-template-columns:240px 1fr;background:#f1f5f9;color:#0f172a}aside{background:#0f172a;color:#fff;padding:1.25rem;display:flex;flex-direction:column;gap:.75rem}aside h1{font-size:1rem;margin:0 0 1rem}a{color:#e2e8f0;text-decoration:none;padding:.65rem;border-radius:10px}a:hover{background:#1e293b}section{padding:1.5rem}`]
})
export class DashboardLayoutComponent {}
