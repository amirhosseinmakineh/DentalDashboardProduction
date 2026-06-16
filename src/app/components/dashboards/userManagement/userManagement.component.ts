import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ITableColumn } from './../../../../framwork/models/iTableColumn';
import { TableComponent } from '../../../../framwork/components/tableComponent/tableComponent.component';
import { BaseDialogComponent } from '../../../../framwork/components/base-dialog.component.ts/base-dialog.component.ts.component';
import { PersianDatePickerComponent } from '../../../../framwork/components/persian-date-picker/persian-date-picker.component';

import { UserDto } from '../../../dtos/users/userDto';
import { RoleDto } from './../../../dtos/role/roleDto';

import { UserManagmentService } from '../../../services/userManagment/userManagment.service';
import { GetUsersQuery } from '../../../requests/users/queries/getUsersQuery';
import { CreateUserCommand } from '../../../requests/users/commands/createUserCommand';
import { UpdateUserCommand } from '../../../requests/users/commands/updateUserCommand';
import { Gender } from '../../../enums/gender.enum';
import { DeleteUserCommand } from '../../../requests/users/commands/deleteUserCommand';

type DialogMode = 'create' | 'update' | 'delete' | 'view';

@Component({
  selector: 'app-userManagement',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableComponent,
    BaseDialogComponent,
    PersianDatePickerComponent
  ],
  templateUrl: './userManagement.component.html',
  styleUrls: ['./userManagement.component.css']
})
export class UserManagementComponent implements OnInit {

  private api = inject(UserManagmentService);
  private readonly toaster = inject(ToastrService);

  users: UserDto[] = [];
  roles: RoleDto[] = [];

  loading = false;
  dialogLoading = false;

  totalCount = 0;
  pageNumber = 1;
  pageSize = 10;

  isDialogOpen = false;
  dialogTitle = '';
  dialogMode: DialogMode = 'create';

  selectedUser: UserDto | null = null;
  selectedImageName = '';

  createUserForm: CreateUserCommand = this.getEmptyCreateUserCommand();
  updateUserForm: UpdateUserCommand = this.getEmptyUpdateUserCommand();

  roleTitles: Record<string, string> = {
    Admin: 'مدیر سیستم',
    Consultant: 'مشاور',
    NormalUser: 'کاربر عادی',
    Patient: 'بیمار',
    Secretary: 'منشی'
  };

  query: GetUsersQuery = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    roleName: '',
    gender: Gender.male,
    isActive: null,
    pageNumber: 1,
    pageSize: 10,
    items: [],
    totalCount: 0,
    totalPages: 0,
    hasPrevious: false,
    hasNext: false
  };

  columns: ITableColumn[] = [
    { key: 'firstName', title: 'نام', width: '18%' },
    { key: 'lastName', title: 'نام خانوادگی', width: '22%' },
    { key: 'phoneNumber', title: 'شماره موبایل', width: '20%' },
    { key: 'roleName', title: 'نقش کاربر', width: '20%' },
    { key: 'isActive', title: 'فعال/غیر فعال', width: '20%' }
  ];

  ngOnInit(): void {
    this.onGetget();
    this.getRoles();
  }

  onGetget(): void {
    this.loading = true;
    this.query.pageNumber = this.pageNumber;
    this.query.pageSize = this.pageSize;

    this.api.getUsers(this.query).subscribe({
      next: (res: any) => {
        this.loading = false;
        const result = res?.data ?? res;
        this.users = result?.items ?? [];
        this.totalCount = result?.totalCount ?? 0;
        this.pageNumber = result?.pageNumber ?? 1;
        this.pageSize = result?.pageSize ?? 10;
      },
      error: (error) => {
        this.loading = false;
        this.toaster.error(error?.error?.message ?? 'خطا در دریافت لیست کاربران');
      }
    });
  }

  getRoles(): void {
    this.api.getRoles().subscribe({
      next: (res: any) => {
        const result = res?.data ?? res;
        this.roles = result?.items ?? [];
      },
      error: (error) => {
        this.toaster.error(error?.error?.message ?? 'خطا در دریافت لیست نقش‌ها');
      }
    });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.onGetget();
  }

  onSearch(value: string): void {
    this.query.firstName = value;
    this.query.lastName = value;
    this.query.phoneNumber = value;
    this.query.roleName = value;
    this.pageNumber = 1;
    this.onGetget();
  }

  onAdd(): void {
    this.dialogMode = 'create';
    this.dialogTitle = 'افزودن کاربر';
    this.selectedUser = null;
    this.selectedImageName = '';
    this.createUserForm = this.getEmptyCreateUserCommand();
    this.isDialogOpen = true;
  }

onEdit(user: UserDto): void {
  console.log('EDIT CLICKED:', user);

  if (!user) {
    this.toaster.error('اطلاعات کاربر برای ویرایش یافت نشد');
    return;
  }

  this.dialogMode = 'update';
  this.dialogTitle = 'ویرایش کاربر';
  this.selectedUser = user;

  this.updateUserForm = {
    id: user.id ?? '',
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    phoneNumber: user.phoneNumber ?? '',
    isCompleteProfile: false,
    avatarImageName: '',
    gender: Gender.male,
    isActive: user.isActive ?? true,
    roleName: user.roleName ?? ''
  };

  this.isDialogOpen = true;

  console.log('UPDATE FORM:', this.updateUserForm);
  console.log('DIALOG OPEN:', this.isDialogOpen);
}
  onDelete(user: UserDto): void {
    this.dialogMode = 'delete';
    this.dialogTitle = 'حذف کاربر';
    this.selectedUser = user;
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    if (this.dialogLoading) return;

    this.isDialogOpen = false;
    this.selectedUser = null;
    this.selectedImageName = '';
    this.createUserForm = this.getEmptyCreateUserCommand();
    this.updateUserForm = this.getEmptyUpdateUserCommand();
  }

  confirmDialog(): void {
    if (this.dialogMode === 'create') {
      this.createUser();
      return;
    }

    if (this.dialogMode === 'update') {
      this.updateUser();
      return;
    }

    if (this.dialogMode === 'delete') {
      this.deleteUser();
    }
  }

  createUser(): void {
    this.dialogLoading = true;

    this.api.createUser(this.createUserForm).subscribe({
      next: (res) => {
        this.dialogLoading = false;
        this.toaster.success(res?.message ?? 'کاربر با موفقیت ثبت شد');
        this.closeDialog();
        this.onGetget();
      },
      error: (error) => {
        this.dialogLoading = false;
        this.toaster.error(error?.error?.message ?? 'خطا در ثبت کاربر');
      }
    });
  }

  updateUser(): void {
    if (!this.updateUserForm.id) {
      this.toaster.error('شناسه کاربر برای ویرایش یافت نشد');
      return;
    }

    this.dialogLoading = true;

    this.api.updateUser(this.updateUserForm).subscribe({
      next: (res) => {
        this.dialogLoading = false;
        this.toaster.success(res?.message ?? 'کاربر با موفقیت ویرایش شد');
        this.closeDialog();
        this.onGetget();
      },
      error: (error) => {
        this.dialogLoading = false;
        this.toaster.error(error?.error?.message ?? 'خطا در ویرایش کاربر');
      }
    });
  }
deleteUser(): void {
  if (!this.selectedUser?.id) {
    this.toaster.error('شناسه کاربر برای حذف یافت نشد');
    return;
  }

  const command: DeleteUserCommand = {
    userId: this.selectedUser.id
  };

  this.dialogLoading = true;

  this.api.deleteUser(command).subscribe({
    next: (res) => {
      this.dialogLoading = false;

      this.toaster.success(
        res?.message ?? 'کاربر با موفقیت حذف شد'
      );

      this.closeDialog();
      this.onGetget();
    },
    error: (error) => {
      this.dialogLoading = false;

      this.toaster.error(
        error?.error?.message ?? 'خطا در حذف کاربر'
      );
    }
  });
}

  openCreateDialog(): void {
    this.onAdd();
  }

  openUpdateDialog(user: UserDto): void {
    this.onEdit(user);
  }

  openDeleteDialog(user: UserDto): void {
    this.onDelete(user);
  }

  getRoleTitle(roleName: string | null | undefined): string {
    if (!roleName) return '-';
    return this.roleTitles[roleName] ?? roleName;
  }

  onBirthDateChanged(event: { persianDate: string; gregorianDate: string | null }): void {
    if (this.dialogMode === 'create') {
      this.createUserForm.birthDate = event.gregorianDate as any;
    }
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    this.selectedImageName = file.name;

    if (this.dialogMode === 'create') {
      this.createUserForm.avatarImageName = file.name;
      return;
    }

    if (this.dialogMode === 'update') {
      this.updateUserForm.avatarImageName = file.name;
    }
  }

  private getEmptyCreateUserCommand(): CreateUserCommand {
    return {
      firstName: '',
      lastName: '',
      birthDate: new Date(),
      gender: Gender.male,
      isCompleteProfile: false,
      passwordHash: '',
      phoneNumber: '',
      roleName: '',
      avatarImageName: ''
    };
  }

  private getEmptyUpdateUserCommand(): UpdateUserCommand {
    return {
      id: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      isCompleteProfile: false,
      avatarImageName: '',
      gender: Gender.male,
      isActive: true,
      roleName: ''
    };
  }
}
