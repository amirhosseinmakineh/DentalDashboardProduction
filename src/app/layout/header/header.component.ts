import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({selector:'app-header', standalone:true, imports:[RouterLink], template:`<header class="site-header"><a routerLink="/" class="brand">داشبورد دندانپزشکی</a><nav><a routerLink="/admin">مدیر</a><a routerLink="/consultant">مشاور</a><a routerLink="/patient">بیمار</a><a routerLink="/receptionist">پذیرش</a></nav><div class="auth-actions"><button class="btn ghost" (click)="authRequested.emit('login')">ورود</button><button class="btn primary" (click)="authRequested.emit('register')">عضویت</button></div></header>`})
export class HeaderComponent { @Output() authRequested = new EventEmitter<'login'|'register'>(); }
