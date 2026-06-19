import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BaseDialogComponent } from './base/base-dialog/base-dialog.component';
import { BaseToastComponent } from './base/base-toast/base-toast.component';
import { BaseDatePickerComponent } from './base/base-date-picker/base-date-picker.component';
import { BaseToastService } from './base/base-toast/base-toast.service';
import { dashboardForRole, persistAuth } from './core/auth-context';

interface AuthForm { firstName: string; lastName: string; phoneNumber: string; passwordHash: string; isCompleteProfile: boolean; avatarImageName: string; gender: number; birthDate: string; }

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf, FormsModule, BaseDialogComponent, BaseToastComponent, BaseDatePickerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly http=inject(HttpClient); private readonly router=inject(Router); private readonly toast=inject(BaseToastService); private readonly apiBase='http://localhost:5182/api';
  readonly authOpen = signal(false); readonly authTab = signal<'login' | 'register'>('login'); readonly authLoading=signal(false); readonly avatarPreview=signal('');
  authForm: AuthForm = { firstName: '', lastName: '', phoneNumber: '', passwordHash: '', isCompleteProfile: true, avatarImageName: '', gender: 1, birthDate: new Date().toISOString() };

  openAuth(tab: 'login' | 'register') { this.authTab.set(tab); this.authOpen.set(true); }
  submitAuth() { this.authTab() === 'login' ? this.login() : this.register(); }
  setBirthDate(date: Date) { this.authForm.birthDate = date.toISOString(); }
  onAvatarSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.authForm.avatarImageName = file.name;
    const reader = new FileReader();
    reader.onload = () => this.avatarPreview.set(String(reader.result));
    reader.readAsDataURL(file);
  }

  private register() {
    if (!this.validateRegister()) return;
    this.authLoading.set(true);
    const payload = { ...this.authForm, phoneNumber: this.authForm.phoneNumber.trim(), firstName: this.authForm.firstName.trim(), lastName: this.authForm.lastName.trim() };
    this.http.post(`${this.apiBase}/Auth`, payload).subscribe({
      next: (response) => this.finishAuth(response, payload.phoneNumber, 'ثبت‌نام با موفقیت انجام شد'),
      error: () => { this.toast.error('ثبت‌نام ناموفق بود'); this.authLoading.set(false); }
    });
  }
  private login() {
    if (!this.authForm.phoneNumber.trim() || !this.authForm.passwordHash) { this.toast.error('شماره موبایل و رمز عبور الزامی است'); return; }
    this.authLoading.set(true);
    this.http.post(`${this.apiBase}/Auth/Login`, { phoneNumber: this.authForm.phoneNumber.trim(), passwordHash: this.authForm.passwordHash }).subscribe({
      next: (response) => this.finishAuth(response, this.authForm.phoneNumber.trim(), 'ورود با موفقیت انجام شد'),
      error: () => { this.toast.error('ورود ناموفق بود'); this.authLoading.set(false); }
    });
  }
  private finishAuth(response: unknown, phoneNumber: string, message: string) {
    const role = persistAuth(response, phoneNumber);
    this.toast.success(message);
    this.authOpen.set(false); this.authLoading.set(false);
    this.router.navigateByUrl(dashboardForRole(role));
  }
  private validateRegister() {
    if (!this.authForm.firstName.trim() || !this.authForm.lastName.trim()) { this.toast.error('نام و نام خانوادگی الزامی است'); return false; }
    if (!this.authForm.phoneNumber.trim()) { this.toast.error('شماره موبایل الزامی است'); return false; }
    if (!this.authForm.passwordHash || this.authForm.passwordHash.length < 6) { this.toast.error('رمز عبور باید حداقل ۶ کاراکتر باشد'); return false; }
    if (!this.authForm.birthDate) { this.toast.error('تاریخ تولد الزامی است'); return false; }
    return true;
  }
}
