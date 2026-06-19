import { Component, Input, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { clearAuth, currentFullName } from '../../core/auth-context';

export interface LayoutMenuItem { label: string; path: string; icon: string; }

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <section class="mobile-app-layout">
      <header class="app-topbar"><button class="icon-btn" (click)="drawerOpen.set(true)"><i class="fa-solid fa-bars" aria-hidden="true"></i></button><div><small>{{ role }}</small><h1>{{ title }}</h1><p *ngIf="displayName()">{{ displayName() }}</p></div><button class="btn ghost" type="button" (click)="logout()">خروج</button></header>
      <div class="drawer-overlay" [class.open]="drawerOpen()" (click)="drawerOpen.set(false)"></div>
      <aside class="app-drawer" [class.open]="drawerOpen()"><div class="drawer-handle"></div><h2>{{ role }}</h2><a *ngFor="let item of menu" [routerLink]="item.path" routerLinkActive="active" (click)="drawerOpen.set(false)"><i *ngIf="item.icon.startsWith('fa')" [class]="item.icon" aria-hidden="true"></i><span *ngIf="!item.icon.startsWith('fa')">{{ item.icon }}</span> {{ item.label }}</a><button class="btn ghost" type="button" (click)="logout()">خروج</button></aside>
      <div class="app-shell-body"><aside class="desktop-sidebar"><h2>{{ role }}</h2><a *ngFor="let item of menu" [routerLink]="item.path" routerLinkActive="active"><i *ngIf="item.icon.startsWith('fa')" [class]="item.icon" aria-hidden="true"></i><span *ngIf="!item.icon.startsWith('fa')">{{ item.icon }}</span> {{ item.label }}</a><button class="btn ghost" type="button" (click)="logout()">خروج</button></aside><main class="app-content"><router-outlet /></main></div>
      <footer class="app-bottom-nav"><a *ngFor="let item of menu" [routerLink]="item.path" routerLinkActive="active"><i *ngIf="item.icon.startsWith('fa')" [class]="item.icon" aria-hidden="true"></i><span *ngIf="!item.icon.startsWith('fa')">{{ item.icon }}</span><span>{{ item.label }}</span></a></footer>
    </section>
  `
})
export class BaseLayoutComponent {
  private readonly router=inject(Router);
  @Input() role = 'داشبورد';
  @Input() title = 'داشبورد دندانپزشکی';
  @Input() menu: LayoutMenuItem[] = [];
  drawerOpen = signal(false);
  displayName(){return currentFullName();}
  logout(){clearAuth();this.router.navigateByUrl('/');}
}
