import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type DialogMode = 'create' | 'update' | 'delete' | 'view';

@Component({
  selector: 'app-base-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-dialog.component.ts.component.html',
  styleUrls: ['./base-dialog.component.ts.component.css']
})
export class BaseDialogComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() mode: DialogMode = 'create';
  @Input() loading = false;

  @Output() closeDialog = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  close(): void {
    if (this.loading) return;
    this.closeDialog.emit();
  }

  submit(): void {
    if (this.loading) return;
    this.confirm.emit();
  }

  get confirmText(): string {
    switch (this.mode) {
      case 'create': return 'ثبت';
      case 'update': return 'ذخیره تغییرات';
      case 'delete': return 'حذف';
      case 'view': return 'بستن';
      default: return 'تایید';
    }
  }
}
