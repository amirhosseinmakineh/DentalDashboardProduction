import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseDialogComponent } from '../../base/base-dialog/base-dialog.component';
import { BaseDatePickerComponent } from '../../base/base-date-picker/base-date-picker.component';
import { BaseToastService } from '../../base/base-toast/base-toast.service';

enum Gender { Male = 1, Female = 2 }

type ApiListResponse<T> = T[] | { data?: T[]; items?: T[]; result?: T[] };

interface RoleDto { id?: string; name?: string; roleName?: string; title?: string; }
interface UserDto {
  id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatarImageName?: string;
  gender?: number;
  birthDate?: string;
  roleName?: string;
  isActive?: boolean;
  createDate?: string;
  updateDate?: string;
}
interface UserForm {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  passwordHash: string;
  avatarImageName: string;
  gender: Gender;
  birthDate: string;
  roleName: string;
  isActive: boolean;
}
interface UserFilters {
  FirstName: string;
  LastName: string;
  RoleName: string;
  PhoneNumber: string;
  IsActive: string;
  CreateDate: string;
  UpdateDate: string;
  DeleteDate: string;
  PageNumber: number;
  PageSize: number;
}

@Component({
  selector: 'app-admin-users-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, BaseDialogComponent, BaseDatePickerComponent],
  template: `
    <section class="screen-stack admin-dashboard">
      <article class="hero-card"><small>داشبورد مدیر</small><h2>مدیریت کاربران</h2><p>لیست، افزودن، ویرایش و حذف کاربران به صورت داینامیک از API انجام می‌شود.</p></article>

      <section class="table-card">
        <button class="btn ghost filter-toggle" type="button" (click)="filtersOpen.set(!filtersOpen())"><i class="fa-solid fa-filter"></i> فیلترهای کاربران</button>
        <div class="filter-panel user-filter-grid responsive-filter-panel" [class.open]="filtersOpen()">
          <label><span>نام کاربر</span><input class="control" placeholder="مثلا: سارا" [(ngModel)]="filters.FirstName" /></label>
          <label><span>نام خانوادگی کاربر</span><input class="control" placeholder="مثلا: احمدی" [(ngModel)]="filters.LastName" /></label>
          <label><span>شماره موبایل کاربر</span><input class="control" placeholder="مثلا: 0912..." [(ngModel)]="filters.PhoneNumber" /></label>
          <label><span>نقش کاربر</span><select class="control" [(ngModel)]="filters.RoleName"><option value="">همه نقش‌ها</option><option *ngFor="let role of roles()" [value]="roleName(role)">{{ roleName(role) }}</option></select></label>
          <label><span>وضعیت حساب کاربر</span><select class="control" [(ngModel)]="filters.IsActive"><option value="">فعال و غیرفعال</option><option value="true">فقط کاربران فعال</option><option value="false">فقط کاربران غیرفعال</option></select></label>
          <app-base-date-picker label="تاریخ ایجاد کاربر" (dateChange)="setFilterDate('CreateDate', $event)" />
          <app-base-date-picker label="تاریخ آخرین ویرایش کاربر" (dateChange)="setFilterDate('UpdateDate', $event)" />
          <app-base-date-picker label="تاریخ حذف کاربر" (dateChange)="setFilterDate('DeleteDate', $event)" />
          <button class="btn primary" type="button" (click)="loadUsers()"><i class="fa-solid fa-magnifying-glass"></i> اعمال فیلترها</button>
          <button class="btn ghost" type="button" (click)="resetFilters()"><i class="fa-solid fa-rotate-right"></i> پاک‌سازی فیلترها</button>
        </div>
        <div class="table-toolbar"><button class="btn primary" type="button" (click)="openCreate()"><i class="fa-solid fa-user-plus"></i> افزودن کاربر جدید</button></div>
        <div *ngIf="loading()" class="state-card">در حال دریافت کاربران...</div>
        <div *ngIf="!loading() && !users().length" class="state-card">کاربری برای نمایش وجود ندارد.</div>
        <div class="desktop-table" *ngIf="!loading() && users().length">
          <table><thead><tr><th>نام</th><th>نام خانوادگی</th><th>موبایل</th><th>نقش</th><th>وضعیت حساب</th><th>عملیات</th></tr></thead>
            <tbody><tr *ngFor="let user of users()"><td>{{ user.firstName }}</td><td>{{ user.lastName }}</td><td>{{ user.phoneNumber }}</td><td>{{ user.roleName }}</td><td>{{ user.isActive ? 'فعال' : 'غیرفعال' }}</td><td class="actions"><button class="icon-btn" type="button" (click)="openEdit(user)"><i class="fa-solid fa-pen"></i> ویرایش</button><button class="icon-btn danger" type="button" (click)="deleteUser(user)"><i class="fa-solid fa-trash"></i> حذف</button></td></tr></tbody>
          </table>
        </div>
        <div class="mobile-cards" *ngIf="!loading() && users().length"><article class="mobile-row-card" *ngFor="let user of users()"><dl><dt>نام</dt><dd>{{ user.firstName }} {{ user.lastName }}</dd><dt>موبایل</dt><dd>{{ user.phoneNumber }}</dd><dt>نقش</dt><dd>{{ user.roleName }}</dd><dt>وضعیت حساب</dt><dd>{{ user.isActive ? 'فعال' : 'غیرفعال' }}</dd></dl><div class="actions"><button class="btn ghost" type="button" (click)="openEdit(user)">ویرایش</button><button class="btn danger" type="button" (click)="deleteUser(user)">حذف</button></div></article></div>
      </section>
    </section>

    <app-base-dialog [open]="dialogOpen()" [title]="editing() ? 'ویرایش کاربر' : 'افزودن کاربر جدید'" [confirmLabel]="editing() ? 'ذخیره تغییرات' : 'ایجاد کاربر'" (closed)="closeDialog()" (confirm)="submitUser()">
      <div class="form-grid">
        <input class="control" placeholder="نام" [(ngModel)]="form.firstName" />
        <input class="control" placeholder="نام خانوادگی" [(ngModel)]="form.lastName" />
        <input class="control" placeholder="شماره موبایل" [(ngModel)]="form.phoneNumber" />
        <input *ngIf="!editing()" class="control" type="password" placeholder="رمز عبور / passwordHash" [(ngModel)]="form.passwordHash" />
        <select class="control" [(ngModel)]="form.roleName"><option value="">انتخاب نقش</option><option *ngFor="let role of roles()" [value]="roleName(role)">{{ roleName(role) }}</option></select>
        <select class="control" [(ngModel)]="form.gender"><option [ngValue]="1">مرد</option><option [ngValue]="2">زن</option></select>
        <app-base-date-picker label="تاریخ تولد" (dateChange)="setBirthDate($event)" />
        <label class="field"><span>عکس کاربر</span><input class="control" type="file" accept="image/*" (change)="selectAvatar($event)" /></label>
        <div class="state-card" *ngIf="form.avatarImageName"><b>عکس انتخابی:</b> {{ form.avatarImageName }}<img *ngIf="avatarPreview()" [src]="avatarPreview()" alt="پیش‌نمایش عکس کاربر" class="avatar-preview" /></div>
        <label *ngIf="editing()"><input type="checkbox" [(ngModel)]="form.isActive" /> کاربر فعال است</label>
      </div>
    </app-base-dialog>`
})
export class AdminUsersPage implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(BaseToastService);
  private readonly apiBase = 'http://localhost:5182/api';

  readonly users = signal<UserDto[]>([]);
  readonly roles = signal<RoleDto[]>([]);
  readonly loading = signal(false);
  readonly dialogOpen = signal(false);
  readonly editing = signal(false);
  readonly avatarPreview = signal('');
  readonly filtersOpen = signal(false);

  filters: UserFilters = this.defaultFilters();
  form: UserForm = this.emptyForm();

  ngOnInit() { this.loadRoles(); this.loadUsers(); }

  roleName(role: RoleDto) { return role.roleName ?? role.name ?? role.title ?? ''; }

  loadRoles() {
    const params = new HttpParams().set('PageNumber', 1).set('PageSize', 1000);
    this.http.get<ApiListResponse<RoleDto>>(`${this.apiBase}/role`, { params }).subscribe({
      next: (response) => this.roles.set(this.extractList(response)),
      error: () => this.toast.error('دریافت نقش‌ها ناموفق بود')
    });
  }

  loadUsers() {
    this.loading.set(true);
    this.http.get<ApiListResponse<UserDto>>(`${this.apiBase}/user`, { params: this.userFilterParams() }).subscribe({
      next: (response) => { this.users.set(this.extractList(response)); this.loading.set(false); },
      error: () => { this.toast.error('دریافت کاربران ناموفق بود'); this.loading.set(false); }
    });
  }

  resetFilters() { this.filters = this.defaultFilters(); this.loadUsers(); }
  setFilterDate(key: 'CreateDate' | 'UpdateDate' | 'DeleteDate', value: Date) { this.filters[key] = value.toISOString(); }
  setBirthDate(value: Date) { this.form.birthDate = value.toISOString(); }
  openCreate() { this.editing.set(false); this.form = this.emptyForm(); this.avatarPreview.set(''); this.dialogOpen.set(true); }
  openEdit(user: UserDto) {
    this.editing.set(true);
    this.form = {
      id: user.id,
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      phoneNumber: user.phoneNumber ?? '',
      passwordHash: '',
      avatarImageName: user.avatarImageName ?? '',
      gender: (user.gender === Gender.Female ? Gender.Female : Gender.Male),
      birthDate: user.birthDate ?? '',
      roleName: user.roleName ?? '',
      isActive: user.isActive ?? true
    };
    this.avatarPreview.set('');
    this.dialogOpen.set(true);
  }
  closeDialog() { this.dialogOpen.set(false); }

  submitUser() {
    if (this.editing()) { this.updateUser(); return; }
    this.createUser();
  }

  createUser() {
    const payload = {
      firstName: this.form.firstName,
      lastName: this.form.lastName,
      phoneNumber: this.form.phoneNumber,
      passwordHash: this.form.passwordHash,
      avatarImageName: this.form.avatarImageName,
      gender: Number(this.form.gender),
      birthDate: this.form.birthDate,
      roleName: this.form.roleName
    };
    this.http.post(`${this.apiBase}/user`, payload).subscribe({
      next: () => { this.toast.success('کاربر جدید با موفقیت افزوده شد'); this.closeDialog(); this.loadUsers(); },
      error: () => this.toast.error('افزودن کاربر ناموفق بود')
    });
  }

  updateUser() {
    const payload = {
      id: this.form.id,
      firstName: this.form.firstName,
      lastName: this.form.lastName,
      phoneNumber: this.form.phoneNumber,
      avatarImageName: this.form.avatarImageName,
      gender: Number(this.form.gender),
      isActive: this.form.isActive,
      roleName: this.form.roleName
    };
    this.http.put(`${this.apiBase}/user`, payload).subscribe({
      next: () => { this.toast.success('اطلاعات کاربر با موفقیت به‌روزرسانی شد'); this.closeDialog(); this.loadUsers(); },
      error: () => this.toast.error('ویرایش کاربر ناموفق بود')
    });
  }

  deleteUser(user: UserDto) {
    const params = new HttpParams().set('UserId', user.id);
    this.http.delete(`${this.apiBase}/user`, { params }).subscribe({
      next: () => { this.toast.warning('کاربر حذف شد'); this.loadUsers(); },
      error: () => this.toast.error('حذف کاربر ناموفق بود')
    });
  }

  selectAvatar(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.form.avatarImageName = file.name;
    const reader = new FileReader();
    reader.onload = () => this.avatarPreview.set(String(reader.result ?? ''));
    reader.readAsDataURL(file);
  }

  private userFilterParams() {
    let params = new HttpParams().set('PageNumber', this.filters.PageNumber).set('PageSize', this.filters.PageSize);
    (['FirstName','LastName','RoleName','PhoneNumber','IsActive','CreateDate','UpdateDate','DeleteDate'] as const).forEach((key) => {
      const value = this.filters[key];
      if (value !== '') params = params.set(key, String(value));
    });
    return params;
  }

  private extractList<T>(response: ApiListResponse<T>) { return Array.isArray(response) ? response : response.data ?? response.items ?? response.result ?? []; }
  private defaultFilters(): UserFilters { return { FirstName:'', LastName:'', RoleName:'', PhoneNumber:'', IsActive:'', CreateDate:'', UpdateDate:'', DeleteDate:'', PageNumber:1, PageSize:1 }; }
  private emptyForm(): UserForm { return { id:'', firstName:'', lastName:'', phoneNumber:'', passwordHash:'', avatarImageName:'', gender:Gender.Male, birthDate:new Date().toISOString(), roleName:'', isActive:true }; }
}
