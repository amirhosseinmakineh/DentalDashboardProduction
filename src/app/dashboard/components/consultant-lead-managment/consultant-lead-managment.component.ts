import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseDialogComponent } from '../../../shared/components/base-dialog/base-dialog.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { ConsultantLeadDto, SubmitLeadCallReportCommand } from '../../../core/models/consultant-lead.models';
import { ConsultantService } from '../../../core/services/consultant.service';
import { getApiMessage, getHttpErrorMessage } from '../../../core/services/api-response.util';
import { ToastrService } from 'ngx-toastr';

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

  columns = [
    { key: 'userName', title: 'نام مشتری' },
    { key: 'phoneNumber', title: 'شماره موبایل' },
    { key: 'assignmentTypeTitle', title: 'نوع لید' },
    { key: 'leadStateTitle', title: 'وضعیت' },
    { key: 'assignedAtTitle', title: 'زمان تخصیص' },
    { key: 'callDeadlineAtTitle', title: 'مهلت تماس' }
  ];

  customActions = [
    { key: 'submitReport', title: 'ثبت گزارش تماس', icon: 'fa-solid fa-clipboard-check', className: 'report-btn' }
  ];

  callResultOptions = [
    { value: 1, title: 'تماس گرفته شد' },
    { value: 2, title: 'تبدیل شد' },
    { value: 3, title: 'رد شد' },
    { value: 4, title: 'پاسخ نداد' },
    { value: 5, title: 'شماره اشتباه' },
    { value: 6, title: 'نیاز به پیگیری' }
  ];

  ngOnInit(): void {
    this.resolveProfileId();

    if (this.profileId) {
      this.loadLeads();
    }
  }

  getAssignmentTypeTitle(type: number): string {
    return type === 1 ? 'RealTime' : type === 2 ? 'OfflineQueue' : '-';
  }

  getLeadStateTitle(state: number): string {
    return ({
      1: 'جدید',
      2: 'تخصیص داده شده',
      3: 'تماس گرفته شده',
      4: 'در انتظار',
      5: 'تبدیل شده',
      6: 'منقضی شده',
      7: 'رد شده'
    } as Record<number, string>)[state] ?? '-';
  }

  onSearch(value: string): void {
    this.search = value;
    this.pageNumber = 1;
    this.loadLeads();
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadLeads();
  }

  onCustomAction(event: { action: { key: string }; row: LeadRow }): void {
    if (event.action.key === 'submitReport') {
      this.openReportDialog(event.row);
    }
  }

  openReportDialog(lead: LeadRow): void {
    if (!this.canSubmitReport(lead)) {
      this.toastr.warning('این لید قبلاً تعیین تکلیف شده است');
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

  submitReport(): void {
    if (!this.reportForm.callResult || !this.reportForm.reportDescription.trim()) {
      this.toastr.warning('نتیجه تماس و توضیحات گزارش الزامی است');
      return;
    }

    this.dialogLoading = true;
    this.consultantService.submitLeadCallReport(this.reportForm).subscribe({
      next: (response) => {
        this.toastr.success(getApiMessage(response, 'گزارش تماس با موفقیت ثبت شد'));
        this.closeDialog();
        this.loadLeads();
      },
      error: (error) => this.toastr.error(getHttpErrorMessage(error)),
      complete: () => this.dialogLoading = false
    });
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.selectedLead = null;
  }

  private loadLeads(): void {
    this.loading = true;
    this.consultantService.getLeads({
      profileId: this.profileId,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search
    }).subscribe({
      next: (response) => {
        this.leads = response.items.map((lead) => this.toLeadRow(lead));
        this.totalCount = response.totalCount;
      },
      error: (error) => this.toastr.error(getHttpErrorMessage(error)),
      complete: () => this.loading = false
    });
  }

  private resolveProfileId(): void {
    const routeProfileId = Number(this.route.snapshot.paramMap.get('profileId'));
    this.profileId = routeProfileId || this.getProfileIdFromStorage();

    if (!this.profileId) {
      this.toastr.error('شناسه پروفایل مشاور یافت نشد');
    }
  }

  private getProfileIdFromStorage(): number {
    const keys = ['consultantProfileId', 'profileId'];

    for (const key of keys) {
      const value = Number(localStorage.getItem(key));
      if (value) return value;
    }

    const profile = localStorage.getItem('profile') ?? localStorage.getItem('user');

    if (profile) {
      try {
        const parsed = JSON.parse(profile) as Record<string, unknown>;
        return Number(parsed['consultantProfileId'] ?? parsed['profileId'] ?? parsed['id']) || 0;
      } catch {
        return 0;
      }
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

  private formatDate(value?: string): string {
    return value ? new Date(value).toLocaleString('fa-IR') : '-';
  }
}
