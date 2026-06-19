import { Component, computed, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { BaseDialogComponent } from './base/base-dialog/base-dialog.component';
import { BaseToastComponent } from './base/base-toast/base-toast.component';
import { BaseDatePickerComponent } from './base/base-date-picker/base-date-picker.component';
import { BaseToastService } from './base/base-toast/base-toast.service';
import { currentRole, dashboardForRole, isAuthenticated, persistAuth } from './core/auth-context';
import { readStorage } from './core/consultant-profile-context';

interface AuthForm { firstName: string; lastName: string; phoneNumber: string; passwordHash: string; isCompleteProfile: boolean; avatarImageName: string; gender: number; birthDate: string; }
interface HeaderUser { firstName: string; lastName: string; phoneNumber: string; role: string; }

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf, FormsModule, BaseDialogComponent, BaseToastComponent, BaseDatePickerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly http=inject(HttpClient); private readonly router=inject(Router); private readonly toast=inject(BaseToastService); private readonly apiBase='http://localhost:5182/api';
  readonly authOpen = signal(false); readonly authTab = signal<'login' | 'register'>('login'); readonly authLoading=signal(false); readonly avatarPreview=signal(''); readonly authError=signal('');
  readonly headerUser = signal<HeaderUser | null>(null);
  readonly currentUrl = signal(this.router.url);
  readonly dashboardUrl = computed(() => dashboardForRole(this.headerUser()?.role || currentRole()));
  readonly isDashboardRoute = computed(() => /^\/(admin|consultant|patient)(\/|$)/.test(this.currentUrl()));
  authForm: AuthForm = { firstName: '', lastName: '', phoneNumber: '', passwordHash: '', isCompleteProfile: true, avatarImageName: '', gender: 1, birthDate: new Date().toISOString() };

  constructor() {
    this.refreshHeaderUser();
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(event => {
      this.currentUrl.set(event.urlAfterRedirects);
      this.refreshHeaderUser();
    });
  }

  openAuth(tab: 'login' | 'register') { this.authTab.set(tab); this.authOpen.set(true); }
  submitAuth() { this.authError.set(''); this.authTab() === 'login' ? this.login() : this.register(); }
  setBirthDate(date: Date) { this.authForm.birthDate = date.toISOString(); }
  onAvatarSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.authForm.avatarImageName = file.name;
    const reader = new FileReader();
    reader.onload = () => this.avatarPreview.set(String(reader.result));
    reader.readAsDataURL(file);
  }

  private refreshHeaderUser() {
    if (!isAuthenticated()) { this.headerUser.set(null); return; }
    this.headerUser.set({ firstName: readStorage('currentUserFirstName'), lastName: readStorage('currentUserLastName'), phoneNumber: readStorage('currentUserPhone'), role: currentRole() });
  }
  private register() {
    if (!this.validateRegister()) return;
    this.authLoading.set(true);
    const payload = { ...this.authForm, phoneNumber: this.authForm.phoneNumber.trim(), firstName: this.authForm.firstName.trim(), lastName: this.authForm.lastName.trim() };
    this.http.post(`${this.apiBase}/Auth`, payload).subscribe({
      next: (response) => this.finishAuth(response, payload.phoneNumber, 'ثبت‌نام با موفقیت انجام شد'),
      error: () => { this.authError.set('ثبت‌نام ناموفق بود'); this.toast.error('ثبت‌نام ناموفق بود'); this.authLoading.set(false); }
    });
  }
  private login() {
    if (!this.authForm.phoneNumber.trim() || !this.authForm.passwordHash) { this.authError.set('شماره موبایل و رمز عبور الزامی است'); this.toast.error('شماره موبایل و رمز عبور الزامی است'); return; }
    this.authLoading.set(true);
    this.http.post(`${this.apiBase}/Auth/Login`, { phoneNumber: this.authForm.phoneNumber.trim(), passwordHash: this.authForm.passwordHash }).subscribe({
      next: (response) => this.finishAuth(response, this.authForm.phoneNumber.trim(), 'ورود با موفقیت انجام شد'),
      error: () => { this.authError.set('ورود ناموفق بود'); this.toast.error('ورود ناموفق بود'); this.authLoading.set(false); }
    });
  }
  private finishAuth(response: unknown, phoneNumber: string, message: string) {
    const role = persistAuth(response, phoneNumber);
    this.refreshHeaderUser();
    this.toast.success(message);
    this.authOpen.set(false); this.authLoading.set(false);
    this.router.navigateByUrl(dashboardForRole(role));
  }
  private validateRegister() {
    if (!this.authForm.firstName.trim() || !this.authForm.lastName.trim()) { this.authError.set('نام و نام خانوادگی الزامی است'); this.toast.error('نام و نام خانوادگی الزامی است'); return false; }
    if (!this.authForm.phoneNumber.trim()) { this.authError.set('شماره موبایل الزامی است'); this.toast.error('شماره موبایل الزامی است'); return false; }
    if (!this.authForm.passwordHash || this.authForm.passwordHash.length < 6) { this.authError.set('رمز عبور باید حداقل ۶ کاراکتر باشد'); this.toast.error('رمز عبور باید حداقل ۶ کاراکتر باشد'); return false; }
    if (!this.authForm.birthDate) { this.authError.set('تاریخ تولد الزامی است'); this.toast.error('تاریخ تولد الزامی است'); return false; }
    return true;
  }
}
