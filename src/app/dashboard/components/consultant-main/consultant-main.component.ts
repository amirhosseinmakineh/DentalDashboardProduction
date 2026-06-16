import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConsultantStatusDto } from '../../../core/models/consultant-lead.models';
import { ConsultantService } from '../../../core/services/consultant.service';
import { getApiMessage, getHttpErrorMessage } from '../../../core/services/api-response.util';
import { ToastrService } from '../../../core/services/toastr.service';

@Component({
  selector: 'app-consultant-main',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consultant-main.component.html',
  styleUrl: './consultant-main.component.css'
})
export class ConsultantMainComponent implements OnInit {
  private readonly consultantService = inject(ConsultantService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  profileId = 0;
  loading = false;
  status: ConsultantStatusDto = { profileId: 0, isAvailable: false, isOnline: false };

  ngOnInit(): void { this.profileId = this.resolveProfileId(); if (!this.profileId) { this.toastr.error('شناسه پروفایل مشاور یافت نشد'); return; } this.reloadStatus(); }

  setAvailable(isAvailable: boolean): void {
    this.loading = true;
    this.consultantService.setAvailable({ profileId: this.profileId, isAvailable }).subscribe({
      next: (response) => { this.toastr.success(getApiMessage(response, 'وضعیت حضور با موفقیت ثبت شد')); this.reloadStatus(); },
      error: (error) => this.toastr.error(getHttpErrorMessage(error)),
      complete: () => this.loading = false
    });
  }

  setOnlineOffline(isOnline: boolean): void {
    this.loading = true;
    this.consultantService.setOnlineOffline({ profileId: this.profileId, isOnline }).subscribe({
      next: (response) => { this.toastr.success(getApiMessage(response, 'وضعیت آنلاین با موفقیت ثبت شد')); this.reloadStatus(); },
      error: (error) => this.toastr.error(getHttpErrorMessage(error)),
      complete: () => this.loading = false
    });
  }

  goToMyLeads(): void { this.router.navigate(['/dashboard/my-leads']); }

  private reloadStatus(): void {
    this.consultantService.getStatus(this.profileId).subscribe({
      next: (status) => this.status = status,
      error: () => this.status = { ...this.status, profileId: this.profileId }
    });
  }

  private resolveProfileId(): number {
    for (const key of ['consultantProfileId', 'profileId']) { const value = Number(localStorage.getItem(key)); if (value) return value; }
    return 0;
  }
}
