import { AuthService } from './../../services/auth/auth.service';
import { RegisterCommand } from './../../requests/auth/registerCommand';
import { LoginCommand } from './../../requests/auth/loginCommand';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gender } from '../../enums/gender.enum';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PersianDatePickerComponent } from '../../../framwork/components/persian-date-picker/persian-date-picker.component';
import { BaseDialogComponent } from '../../../framwork/components/base-dialog.component.ts/base-dialog.component.ts.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PersianDatePickerComponent,
    BaseDialogComponent,
  ],
  templateUrl: './Landing.component.html',
  styleUrl: './Landing.component.css'
})
export class LandingComponent {
  protected readonly title = signal('dental-dashboard');

  private readonly _authService = inject(AuthService);
  public get authService() {
    return this._authService;
  }
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  isLoginOpen = false;
  isRegisterOpen = false;
  loading = false;

  Gender = Gender;

  selectedImageName = '';

  loginModel: LoginCommand = {
    phoneNumber: '',
    passwordHash: ''
  };

  registerModel: RegisterCommand = {
    firstName: '',
    lastName: '',
    avatarImageName: '',
    Gender: Gender.male,
    birthDate: new Date,
    passwordHash: '',
    phoneNumber: ''
  };

  openLogin(): void {
    this.isLoginOpen = true;
  }

  openRegister(): void {
    this.isRegisterOpen = true;
  }

  login(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;

    this.authService.login(this.loginModel).subscribe({
      next: (response: any) => {
        if (!response.isSuccess) {
          this.loading = false;

          this.toastr.error(
            response.data?.message ?? response.message ?? 'خطا در ورود'
          );

          return;
        }

        const token = response.data?.token;

        if (!token) {
          this.loading = false;

          this.toastr.error('توکن از سمت سرور دریافت نشد');

          return;
        }

        this.authService.setToken(token);

        const role = this.authService.extractRoleFromToken(token);

        if (role) {
          localStorage.setItem('role', role);
        }

        this.toastr.success(
          response.data?.message ?? 'ورود با موفقیت انجام شد'
        );

        this.isLoginOpen = false;
        this.loading = false;

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 0);
      },

      error: (error) => {
        this.loading = false;

        this.toastr.error(
          error?.error?.data?.message ??
          error?.error?.message ??
          'خطای ارتباط با سرور'
        );

        console.error(error);
      }
    });
  }

  register(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;

    this.authService.register(this.registerModel).subscribe({
      next: (response: any) => {
        this.loading = false;

        if (!response.isSuccess) {
          this.toastr.error(
            response.data?.message ?? response.message ?? 'ثبت نام ناموفق بود'
          );

          return;
        }

        this.toastr.success(
          response.data?.message ?? response.message ?? 'ثبت نام با موفقیت انجام شد'
        );

        this.isRegisterOpen = false;
      },

      error: (error) => {
        this.loading = false;

        this.toastr.error(
          error?.error?.data?.message ??
          error?.error?.message ??
          'خطای ارتباط با سرور'
        );

        console.error(error);
      }
    });
  }

  onBirthDateChanged(event: { persianDate: string; gregorianDate: string | null }): void {
    this.registerModel.birthDate = event.gregorianDate as any;
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    this.selectedImageName = file.name;
    this.registerModel.avatarImageName = file.name;
  }
}
