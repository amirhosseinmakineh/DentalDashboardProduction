import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsultantService } from '../../core/services/consultant.service';
import { getApiMessage, getHttpErrorMessage } from '../../core/services/api-response.util';

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
export class DashboardLayoutComponent implements OnInit {

  private readonly consultantService = inject(ConsultantService);
  private readonly toastr = inject(ToastrService);

  isSidebarOpen = signal(true);
  profileId = 0;
  consultantStatusLoading = false;
  isOnline = localStorage.getItem('consultantIsOnline') === 'true';

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

  ngOnInit(): void {
    this.profileId = this.resolveProfileId();
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update(value => !value);
  }

  setOnlineOffline(isOnline: boolean): void {
    if (!this.profileId) {
      this.toastr.error('شناسه پروفایل مشاور یافت نشد');
      return;
    }

    this.consultantStatusLoading = true;

    this.consultantService.setOnlineOffline({ profileId: this.profileId, isOnline }).subscribe({
      next: (response) => {
        this.isOnline = isOnline;
        localStorage.setItem('consultantIsOnline', String(isOnline));
        this.toastr.success(getApiMessage(response, 'وضعیت آنلاین با موفقیت ثبت شد'));
      },
      error: (error) => this.toastr.error(getHttpErrorMessage(error)),
      complete: () => this.consultantStatusLoading = false
    });
  }

  private resolveProfileId(): number {
    for (const key of ['consultantProfileId', 'profileId']) {
      const value = Number(localStorage.getItem(key));
      if (value) return value;
    }

    return 0;
  }
}
