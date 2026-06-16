import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConsultantService } from '../../../core/services/consultant.service';
import { getApiMessage, getHttpErrorMessage } from '../../../core/services/api-response.util';

@Component({
  selector: 'app-consultant-main',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consultant-main.component.html',
  styleUrl: './consultant-main.component.css'
})
export class ConsultantMainComponent implements OnInit {
  private readonly consultantService = inject(ConsultantService);
  private readonly router = inject(Router);
  profileId = 0;
  loading = false;
  isAvailable = localStorage.getItem('consultantIsAvailable') === 'true';
  isOnline = localStorage.getItem('consultantIsOnline') === 'true';

  ngOnInit(): void { this.profileId = this.resolveProfileId(); if (!this.profileId) { this.showError('شناسه پروفایل مشاور یافت نشد'); } }

  setAvailable(isAvailable: boolean): void {
    this.loading = true;
    this.consultantService.setAvailable({ profileId: this.profileId, isAvailable }).subscribe({
      next: (response) => { this.isAvailable = isAvailable; localStorage.setItem('consultantIsAvailable', String(isAvailable)); this.showSuccess(getApiMessage(response, 'وضعیت حضور با موفقیت ثبت شد')); },
      error: (error) => this.showError(getHttpErrorMessage(error)),
      complete: () => this.loading = false
    });
  }

  setOnlineOffline(isOnline: boolean): void {
    this.loading = true;
    this.consultantService.setOnlineOffline({ profileId: this.profileId, isOnline }).subscribe({
      next: (response) => { this.isOnline = isOnline; localStorage.setItem('consultantIsOnline', String(isOnline)); this.showSuccess(getApiMessage(response, 'وضعیت آنلاین با موفقیت ثبت شد')); },
      error: (error) => this.showError(getHttpErrorMessage(error)),
      complete: () => this.loading = false
    });
  }

  goToMyLeads(): void { this.router.navigate(['/dashboard/my-leads']); }

  private resolveProfileId(): number {
    for (const key of ['consultantProfileId', 'profileId']) { const value = Number(localStorage.getItem(key)); if (value) return value; }
    return 0;
  }
  private showSuccess(message: string): void {
    console.log(message);
  }

  private showError(message: string): void {
    console.error(message);
  }

  private showWarning(message: string): void {
    console.warn(message);
  }

}
