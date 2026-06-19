import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BaseDialogComponent } from './base/base-dialog/base-dialog.component';
import { BaseToastComponent } from './base/base-toast/base-toast.component';
import { writeStorage } from './core/consultant-profile-context';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf, FormsModule, BaseDialogComponent, BaseToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly authOpen = signal(false);
  readonly authTab = signal<'login' | 'register'>('login');
  authForm = { firstName: '', lastName: '', phoneNumber: '', roleName: 'مشاور' };

  openAuth(tab: 'login' | 'register') { this.authTab.set(tab); this.authOpen.set(true); }
  saveAuthContext() {
    if (this.authForm.phoneNumber) writeStorage('currentUserPhone', this.authForm.phoneNumber.trim());
    if (this.authForm.firstName) writeStorage('currentUserFirstName', this.authForm.firstName.trim());
    if (this.authForm.lastName) writeStorage('currentUserLastName', this.authForm.lastName.trim());
    writeStorage('currentUserRole', this.authForm.roleName);
    this.authOpen.set(false);
  }
}
