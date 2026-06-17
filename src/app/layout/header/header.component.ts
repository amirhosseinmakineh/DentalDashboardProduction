import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({selector:'app-header', standalone:true, imports:[RouterLink], template:`<header class="site-header"><a routerLink="/" class="brand">Dental Dashboard</a><nav><a routerLink="/admin">Admin</a><a routerLink="/consultant">Consultant</a><a routerLink="/patient">Patient</a><a routerLink="/receptionist">Receptionist</a></nav><div class="auth-actions"><button class="btn ghost" (click)="authRequested.emit('login')">ورود</button><button class="btn primary" (click)="authRequested.emit('register')">عضویت</button></div></header>`})
export class HeaderComponent { @Output() authRequested = new EventEmitter<'login'|'register'>(); }
