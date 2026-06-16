import { TableActionType } from './../../../../framwork/models/iTableAction';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  ConsultantLeadDto,
  SubmitLeadCallReportCommand
} from '../../../core/models/consultant-lead.models';

import { ConsultantService } from '../../../core/services/consultant.service';
import {
  getApiMessage,
  getHttpErrorMessage
} from '../../../core/services/api-response.util';

import { ToastrService } from 'ngx-toastr';

import { TableComponent } from '../../../../framwork/components/tableComponent/tableComponent.component';
import { BaseDialogComponent } from '../../../../framwork/components/base-dialog.component.ts/base-dialog.component.ts.component';
import { ITableAction } from '../../../../framwork/models/iTableAction';
type LeadRow = ConsultantLeadDto & {
  assignmentTypeTitle: string;
  leadStateTitle: string;
  assignedAtTitle: string;
  callDeadlineAtTitle: string;
};

@Component({
  selector: 'app-consultant-lead-managment',
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent, BaseDialogComponent],
  templateUrl: './consultant-lead-managment.component.html',
  styleUrl: './consultant-lead-managment.component.css'
})
export class ConsultantLeadManagmentComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly consultantService = inject(ConsultantService);
  private readonly toastr = inject(ToastrService);

  // ======================
  // STATE
  // ======================
  leads: LeadRow[] = [];
  loading = false;
  dialogLoading = false;

  totalCount = 0;
  pageNumber = 1;
  pageSize = 10;
  search = '';

  profileId = 0;

  isDialogOpen = false;
  dialogTitle = 'ثبت گزارش تماس';
  dialogMode: 'create' = 'create';

  selectedLead: LeadRow | null = null;

  reportForm: SubmitLeadCallReportCommand = {
    leadAssignmentId: 0,
    consultantProfileId: 0,
    callResult: 1,
    reportDescription: ''
  };

  // ======================
  // TABLE CONFIG
  // ======================
  columns = [
    { key: 'userName', title: 'نام مشتری' },
    { key: 'phoneNumber', title: 'شماره موبایل' },
    { key: 'assignmentTypeTitle', title: 'نوع لید' },
    { key: 'leadStateTitle', title: 'وضعیت' },
    { key: 'assignedAtTitle', title: 'زمان تخصیص' },
    { key: 'callDeadlineAtTitle', title: 'مهلت تماس' }
  ];

  // ✅ FIX اصلی اینجاست (type safe)

customActions: ITableAction[] = [
  {
    key: 'submitReport',
    title: 'ثبت گزارش تماس',
    icon: 'fa-solid fa-clipboard-check',
    type: 'custom' as TableActionType,
    className: 'report-btn'
  }
];
  callResultOptions = [
    { value: 1, title: 'تماس گرفته شد' },
    { value: 2, title: 'تبدیل شد' },
    { value: 3, title: 'رد شد' },
    { value: 4, title: 'پاسخ نداد' },
    { value: 5, title: 'شماره اشتباه' },
    { value: 6, title: 'نیاز به پیگیری' }
  ];

  // ======================
  // INIT
  // ======================
  ngOnInit(): void {
    this.resolveProfileId();

    if (this.profileId) {
      this.loadLeads();
    }
  }

  // ======================
  // EVENTS
  // ======================
  onSearch(value: string): void {
    this.search = value;
    this.pageNumber = 1;
    this.loadLeads();
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadLeads();
  }

  onCustomAction(event: { action: ITableAction; row: LeadRow }): void {
    if (event.action.key === 'submitReport') {
      this.openReportDialog(event.row);
    }
  }

  // ======================
  // DIALOG
  // ======================
  openReportDialog(lead: LeadRow): void {

    if (!this.canSubmitReport(lead)) {
      this.toastr.warning('این لید قبلاً ثبت گزارش شده است');
      return;
    }

    this.selectedLead = lead;

    this.reportForm = {
      leadAssignmentId: lead.id,
      consultantProfileId: this.profileId,
      callResult: 1,
      reportDescription: ''
    };

    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.selectedLead = null;
  }

  submitReport(): void {

    if (!this.reportForm.reportDescription?.trim()) {
      this.toastr.warning('توضیحات الزامی است');
      return;
    }

    this.dialogLoading = true;

    this.consultantService.submitLeadCallReport(this.reportForm).subscribe({
      next: (res) => {
        this.toastr.success(getApiMessage(res, 'ثبت شد'));
        this.closeDialog();
        this.loadLeads();
      },
      error: (err) => this.toastr.error(getHttpErrorMessage(err)),
      complete: () => (this.dialogLoading = false)
    });
  }

  // ======================
  // API
  // ======================
  private loadLeads(): void {

    this.loading = true;

    this.consultantService.getLeads({
      profileId: this.profileId,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search
    }).subscribe({
      next: (res) => {
        this.leads = res.items.map(x => this.toLeadRow(x));
        this.totalCount = res.totalCount;
      },
      error: (err) => this.toastr.error(getHttpErrorMessage(err)),
      complete: () => (this.loading = false)
    });
  }

  // ======================
  // HELPERS
  // ======================
  private resolveProfileId(): void {

    const id = Number(this.route.snapshot.paramMap.get('profileId'));
    this.profileId = id || this.getProfileIdFromStorage();

    if (!this.profileId) {
      this.toastr.error('شناسه مشاور یافت نشد');
    }
  }

  private getProfileIdFromStorage(): number {

    const keys = ['consultantProfileId', 'profileId'];

    for (const k of keys) {
      const v = Number(localStorage.getItem(k));
      if (v) return v;
    }

    return 0;
  }

  private canSubmitReport(lead: ConsultantLeadDto): boolean {
    return !lead.reportSubmittedAt && ![5, 6, 7].includes(lead.leadAssignmentState);
  }

  private toLeadRow(lead: ConsultantLeadDto): LeadRow {
    return {
      ...lead,
      assignmentTypeTitle: this.getAssignmentTypeTitle(lead.assignmentType),
      leadStateTitle: this.getLeadStateTitle(lead.leadAssignmentState),
      assignedAtTitle: this.formatDate(lead.assignedAt),
      callDeadlineAtTitle: this.formatDate(lead.callDeadlineAt)
    };
  }

  private getAssignmentTypeTitle(type: number): string {
    return type === 1 ? 'RealTime' : type === 2 ? 'OfflineQueue' : '-';
  }

  private getLeadStateTitle(state: number): string {
    const map: Record<number, string> = {
      1: 'جدید',
      2: 'تخصیص داده شده',
      3: 'تماس گرفته شده',
      4: 'در انتظار',
      5: 'تبدیل شده',
      6: 'منقضی شده',
      7: 'رد شده'
    };

    return map[state] ?? '-';
  }

  private formatDate(value?: string): string {
    return value ? new Date(value).toLocaleString('fa-IR') : '-';
  }
}
