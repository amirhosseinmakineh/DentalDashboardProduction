import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TableComponent } from '../../../../framwork/components/tableComponent/tableComponent.component';
import { ITableColumn } from '../../../../framwork/models/iTableColumn';
import { ITableAction } from '../../../../framwork/models/iTableAction';

import { AttendanceDto } from '../../../dtos/attendance/attendanceDto';
import { AttendanceService } from '../../../services/attendance/attendance.service';
import { GetAttendanceQuery } from '../../../requests/attendances/queries/getAttendanceQuery';

@Component({
  selector: 'app-attendance-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableComponent
  ],
  templateUrl: './consultantAttendanceManagment.component.html',
  styleUrls: ['./consultantAttendanceManagment.component.css']
})
export class ConsultantAttendanceManagmentComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly attendanceService = inject(AttendanceService);
  private readonly toaster = inject(ToastrService);

  loading = false;

  consultantProfileId = 0;

  attendances: AttendanceDto[] = [];

  totalCount = 0;
  pageNumber = 1;
  pageSize = 10;

  query: GetAttendanceQuery = {
    consultantProfileId: 0,

    pageNumber: 1,
    pageSize: 10,

    items: [],
    totalCount: 0,
    totalPages: 0,
    hasPrevious: false,
    hasNext: false
  };

  columns: ITableColumn[] = [
    { key: 'attendanceDate', title: 'تاریخ حضور', width: '20%' },
    { key: 'checkInTime', title: 'زمان ورود', width: '20%' },
    { key: 'checkOutTime', title: 'زمان خروج', width: '20%' },
    { key: 'statusTitle', title: 'وضعیت', width: '20%' },
    { key: 'description', title: 'توضیحات', width: '20%' }
  ];

  customActions: ITableAction[] = [
    {
      key: 'registerScore',
      title: 'ثبت امتیاز',
      type: 'custom',
      icon: 'fa-solid fa-star',
      className: 'score-btn'
    }
  ];

  ngOnInit(): void {
    this.consultantProfileId = Number(
      this.route.snapshot.paramMap.get('profileId')
    );

    if (!this.consultantProfileId) {
      this.toaster.error('شناسه پروفایل مشاور یافت نشد');
      return;
    }

    this.getAttendances();
  }

  getAttendances(): void {
    this.loading = true;

    this.query.consultantProfileId = this.consultantProfileId;
    this.query.pageNumber = this.pageNumber;
    this.query.pageSize = this.pageSize;
debugger;
    this.attendanceService.getAttendanceByConsultantId(this.query)
      .subscribe({
        next: (res: any) => {
          this.loading = false;

          const result = res?.data ?? res;
          const items = result?.items ?? [];

          this.attendances = items.map((item: AttendanceDto) => ({
            ...item,
            statusTitle: this.getAttendanceStatusTitle(item.status),
            description: item.description ?? '-'
          }));

          this.totalCount = result?.totalCount ?? 0;
          this.pageNumber = result?.pageNumber ?? 1;
          this.pageSize = result?.pageSize ?? 10;
        },
        error: (error) => {
          this.loading = false;

          this.toaster.error(
            error?.error?.message ??
            'خطا در دریافت لیست حضور و غیاب'
          );
        }
      });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.getAttendances();
  }

  onCustomAction(event: {
    action: ITableAction;
    row: AttendanceDto;
  }): void {

    if (event.action.key !== 'registerScore') {
      return;
    }

    console.log('ثبت امتیاز برای حضور:', event.row);
  }

  private getAttendanceStatusTitle(status: number): string {
    switch (status) {
      case 1:
        return 'حاضر';

      case 2:
        return 'غایب';

      case 3:
        return 'مرخصی';

      case 4:
        return 'تاخیر';

      default:
        return '-';
    }
  }
}
