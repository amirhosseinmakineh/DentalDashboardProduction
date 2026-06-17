import { Component, inject, signal } from '@angular/core';
import { BaseTableComponent } from '../../base/base-table/base-table.component';
import { BaseDialogComponent } from '../../base/base-dialog/base-dialog.component';
import { BaseDatePickerComponent } from '../../base/base-date-picker/base-date-picker.component';
import { BaseToastService } from '../../base/base-toast/base-toast.service';
import { users } from '../../shared/mock-data';

@Component({
  selector: 'app-admin-users-page',
  standalone: true,
  imports: [BaseTableComponent, BaseDialogComponent, BaseDatePickerComponent],
  template: `
    <section class="screen-stack admin-dashboard">
      <article class="hero-card"><small>Admin Dashboard</small><h2>User Management</h2><p>Create, edit, filter, and review mock dashboard users.</p></article>
      <app-base-table [columns]="columns" [rows]="users" [filters]="filters" (add)="open('Add User')" (edit)="open('Edit User')" (delete)="remove()" />
    </section>
    <app-base-dialog [open]="!!dialog()" [title]="dialog()" (closed)="dialog.set('')" (confirm)="save()">
      <div class="form-grid"><input class="control" placeholder="Full name"/><input class="control" placeholder="Mobile"/><select class="control"><option>Patient</option><option>Consultant</option><option>Admin</option></select><app-base-date-picker label="Created date" /></div>
    </app-base-dialog>`
})
export class AdminUsersPage { private toast = inject(BaseToastService); users = users; dialog = signal(''); columns = [{key:'name',label:'Name'},{key:'phone',label:'Mobile'},{key:'role',label:'Role'},{key:'status',label:'Status'}]; filters = [{key:'role',label:'Role',type:'select' as const,options:['Patient','Consultant','Admin']},{key:'status',label:'Status',type:'select' as const,options:['Active','Pending']}]; open(title: string){this.dialog.set(title)} save(){this.toast.success('User action saved in mock UI'); this.dialog.set('')} remove(){this.toast.warning('User removed in mock UI')} }
