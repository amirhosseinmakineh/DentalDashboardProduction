import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TableComponent } from '../../../../framwork/components/tableComponent/tableComponent.component';
import { ITableColumn } from '../../../../framwork/models/iTableColumn';
import { ITableAction } from '../../../../framwork/models/iTableAction';

import { ConsultantsDto } from '../../../dtos/consultants/consultantsDto';
import { GetConsultantsQuery } from '../../../requests/consultants/queries/getConsultantsQuery';
import { ConsultantService } from '../../../services/consultant/consultant.service';

@Component({
  selector: 'app-consultant',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableComponent
  ],
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent implements OnInit {

  private readonly consultantService = inject(ConsultantService);
  private readonly toaster = inject(ToastrService);
  private readonly router = inject(Router);

  loading = false;

  consultants: ConsultantsDto[] = [];

  totalCount = 0;
  pageNumber = 1;
  pageSize = 10;

  query: GetConsultantsQuery = {
    firstName: '',
    lastName: '',
    phoneNumber: '',

    pageNumber: 1,
    pageSize: 10,

    items: [],
    totalCount: 0,
    totalPages: 0,
    hasPrevious: false,
    hasNext: false
  };

  columns: ITableColumn[] = [
    { key: 'firstName', title: 'نام', width: '25%' },
    { key: 'lastName', title: 'نام خانوادگی', width: '25%' },
    { key: 'phoneNumber', title: 'شماره موبایل', width: '25%' }
  ];

  customActions: ITableAction[] = [
    {
      key: 'leadManagement',
      title: 'مدیریت لیدها',
      type: 'custom',
      icon: 'fa-solid fa-phone',
      className: 'lead-btn'
    },
    {
      key: 'attendanceManagement',
      title: 'مدیریت حضور',
      type: 'custom',
      icon: 'fa-solid fa-calendar-check',
      className: 'attendance-btn'
    },
    {
      key: 'scoreManagement',
      title: 'مدیریت امتیازات',
      type: 'custom',
      icon: 'fa-solid fa-star',
      className: 'score-btn'
    }
  ];

  ngOnInit(): void {
    this.getConsultants();
  }

  getConsultants(): void {
    this.loading = true;

    this.query.pageNumber = this.pageNumber;
    this.query.pageSize = this.pageSize;

    this.consultantService.getConsultants()
      .subscribe({
        next: (res: any) => {
          this.loading = false;

          const result = res?.data ?? res;

          this.consultants = result?.items ?? [];
          this.totalCount = result?.totalCount ?? 0;
          this.pageNumber = result?.pageNumber ?? 1;
          this.pageSize = result?.pageSize ?? 10;
        },
        error: (error) => {
          this.loading = false;

          this.toaster.error(
            error?.error?.message ??
            'خطا در دریافت لیست مشاوران'
          );
        }
      });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.getConsultants();
  }

  onSearch(value: string): void {
    this.query.firstName = value;
    this.query.lastName = value;
    this.query.phoneNumber = value;

    this.pageNumber = 1;
    this.getConsultants();
  }

  onCustomAction(event: {
    action: ITableAction;
    row: ConsultantsDto;
  }): void {

    const consultant = event.row;
    const profileId = consultant.profileId;

    if (!profileId) {
      this.toaster.error('شناسه پروفایل مشاور یافت نشد');
      return;
    }

    switch (event.action.key) {

      case 'leadManagement':
        this.goToConsultantPage(profileId, 'leads');
        break;

      case 'attendanceManagement':
        this.goToConsultantPage(profileId, 'attendances');
        break;

      case 'scoreManagement':
        this.goToConsultantPage(profileId, 'scores');
        break;
    }
  }

  private goToConsultantPage(
    profileId: number,
    page: 'leads' | 'attendances' | 'scores'
  ): void {
    this.router.navigate([
      '/dashboard/consultant',
      profileId,
      page
    ]);
  }
}
