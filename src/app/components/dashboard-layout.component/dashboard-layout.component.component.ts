import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

interface SidebarItem {
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard-layout.component.component.html',
  styleUrl: './dashboard-layout.component.component.css'
})
export class DashboardLayoutComponent {

  isSidebarOpen = signal(true);

  sidebarItems: SidebarItem[] = [
    {
      title: 'مدیریت کاربران',
      icon: 'fa-solid fa-users',
      route: '/dashboard/userManagement'
    },
    {
      title: 'مدیریت مشاوران',
      icon: 'fa-solid fa-user-tie',
      route: '/dashboard/consultant'
    },
    {
      title: 'مدیریت لیدها',
      icon: 'fa-solid fa-address-book',
      route: '/dashboard/my-leads'
    }
  ];

  toggleSidebar(): void {
    this.isSidebarOpen.update(value => !value);
  }
}
