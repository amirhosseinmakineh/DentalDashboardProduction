import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { BaseDialogComponent } from '../../../../framwork/components/base-dialog.component.ts/base-dialog.component.ts.component';
import { ScoreLogService } from '../../../services/scoreLog/scoreLog.service';
import { ScoreReason } from '../../../enums/ScoreReason';
import { AddScoreLogCommand } from '../../../requests/scoreLog/AddScoreLogCommand';
import { ScoreSource } from '../../../enums/ScoreSource';

type DialogMode = 'create';

@Component({
  selector: 'app-consultantScoreLogManagment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BaseDialogComponent
  ],
  templateUrl: './consultantScoreLogManagment.component.html',
  styleUrls: ['./consultantScoreLogManagment.component.css']
})
export class ConsultantScoreLogManagmentComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toaster = inject(ToastrService);
  private readonly scoreLogService = inject(ScoreLogService);

  profileId = 0;

  isDialogOpen = false;
  dialogLoading = false;

  dialogTitle = 'ثبت امتیاز مشاور';
  dialogMode: DialogMode = 'create';

  scoreReasons = [
    { value: ScoreReason.ManagerReward, title: 'امتیاز تشویقی مدیر' },
    { value: ScoreReason.ManagerPenalty, title: 'امتیاز منفی مدیر' }
  ];

  form: AddScoreLogCommand = this.getEmptyForm();

  ngOnInit(): void {
    this.profileId = Number(this.route.snapshot.paramMap.get('profileId'));

    if (!this.profileId) {
      this.toaster.error('شناسه پروفایل مشاور یافت نشد');
      this.backToConsultants();
      return;
    }

    this.form.consultantProfileId = this.profileId;
    this.isDialogOpen = true;
  }

  confirmDialog(): void {
    this.createScoreLog();
  }

  closeDialog(): void {
    if (this.dialogLoading) return;

    this.isDialogOpen = false;
    this.backToConsultants();
  }

  createScoreLog(): void {
    if (!this.profileId) {
      this.toaster.error('شناسه پروفایل مشاور یافت نشد');
      return;
    }

    if (this.form.scoreValue < 0 || this.form.scoreValue > 100) {
      this.toaster.error('امتیاز باید بین ۰ تا ۱۰۰ باشد');
      return;
    }

    if (!this.form.reason) {
      this.toaster.error('نوع امتیاز را انتخاب کنید');
      return;
    }

    this.dialogLoading = true;

    this.scoreLogService.addScore(this.form).subscribe({
      next: (res: any) => {
        this.dialogLoading = false;

        this.toaster.success(
          res?.message ?? 'امتیاز با موفقیت ثبت شد'
        );

        this.isDialogOpen = false;
        this.backToConsultants();
      },
      error: (error: any) => {
        this.dialogLoading = false;

        this.toaster.error(
          error?.error?.message ?? 'خطا در ثبت امتیاز'
        );
      }
    });
  }

  private backToConsultants(): void {
    this.router.navigate(['/dashboard/consultant']);
  }

  private getEmptyForm(): AddScoreLogCommand {
    return {
      consultantProfileId: 0,
      scoreValue: 0,
      reason: ScoreReason.ManagerReward,
      description: '',
      source : ScoreSource.Manager
    };
  }
}
