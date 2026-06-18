import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({selector:'app-sidebar', standalone:true, imports:[NgFor, RouterLink, RouterLinkActive], template:`<aside class="sidebar"><h3>{{title}}</h3><a *ngFor="let item of items" [routerLink]="item.path" routerLinkActive="active">{{item.label}}</a></aside>`})
export class SidebarComponent { @Input() title='داشبورد'; @Input() items:{label:string;path:string}[]=[]; }
