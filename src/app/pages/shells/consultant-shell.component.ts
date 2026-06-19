import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { BaseLayoutComponent, LayoutMenuItem } from '../../base/base-layout/base-layout.component';
import { currentConsultantProfileId } from '../../core/consultant-profile-context';

@Component({selector:'app-consultant-shell', standalone:true, imports:[BaseLayoutComponent], template:`<app-base-layout role="مشاور" title="داشبورد مشاور" [menu]="menu()" />`})
export class ConsultantShellComponent implements OnInit, OnDestroy {
  readonly menu=signal<LayoutMenuItem[]>(this.buildMenu());
  private readonly syncMenu=()=>this.menu.set(this.buildMenu());
  ngOnInit(){if(typeof window!=='undefined')window.addEventListener('consultant-profile-completed',this.syncMenu);}
  ngOnDestroy(){if(typeof window!=='undefined')window.removeEventListener('consultant-profile-completed',this.syncMenu);}
  private buildMenu(): LayoutMenuItem[]{
    const base: LayoutMenuItem[]=[{label:'حضور / وضعیت آنلاین',path:'/consultant/dashboard',icon:'fa-solid fa-circle-check'},{label:'لیدهای من',path:'/consultant/leads',icon:'fa-solid fa-phone-volume'},{label:'رزروها',path:'/consultant/reservations',icon:'fa-solid fa-calendar-check'}];
    return currentConsultantProfileId()>0?base:[{label:'تکمیل پروفایل',path:'/consultant/profiles',icon:'fa-solid fa-id-card'}];
  }
}
