import { Component, Input, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <section class="mobile-app-layout">
      <header class="app-topbar"><button class="icon-btn" (click)="drawerOpen.set(true)">☰</button><div><small>{{ role }}</small><h1>{{ title }}</h1></div></header>
      <div class="drawer-overlay" [class.open]="drawerOpen()" (click)="drawerOpen.set(false)"></div>
      <aside class="app-drawer" [class.open]="drawerOpen()"><div class="drawer-handle"></div><h2>{{ role }}</h2><a *ngFor="let item of menu" [routerLink]="item.path" routerLinkActive="active" (click)="drawerOpen.set(false)">{{ item.icon }} {{ item.label }}</a></aside>
      <div class="app-shell-body"><aside class="desktop-sidebar"><h2>{{ role }}</h2><a *ngFor="let item of menu" [routerLink]="item.path" routerLinkActive="active">{{ item.icon }} {{ item.label }}</a></aside><main class="app-content"><router-outlet /></main></div>
      <footer class="app-bottom-nav"><a *ngFor="let item of menu" [routerLink]="item.path" routerLinkActive="active">{{ item.icon }}<span>{{ item.label }}</span></a></footer>
    </section>
  `
})
export class BaseLayoutComponent {
  @Input() role = 'Dashboard';
  @Input() title = 'Dental Dashboard';
  @Input() menu: { label: string; path: string; icon: string }[] = [];
  drawerOpen = signal(false);
}
