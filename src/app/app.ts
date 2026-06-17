import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BaseDialogComponent } from './base/base-dialog/base-dialog.component';
import { BaseToastComponent } from './base/base-toast/base-toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf, BaseDialogComponent, BaseToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly authOpen = signal(false);
  readonly authTab = signal<'login' | 'register'>('login');
  openAuth(tab: 'login' | 'register') { this.authTab.set(tab); this.authOpen.set(true); }
}
