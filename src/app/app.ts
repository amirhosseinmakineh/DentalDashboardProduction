import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BaseDialogComponent } from './base/base-dialog/base-dialog.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, HeaderComponent, FooterComponent, BaseDialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly authOpen = signal(false);
  readonly authTab = signal<'login' | 'register'>('login');

  openAuth(tab: 'login' | 'register') {
    this.authTab.set(tab);
    this.authOpen.set(true);
  }
}
