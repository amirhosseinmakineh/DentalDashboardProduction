import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-dialog',
  standalone: true,
  template: `
    @if (open) {
      <div class="dialog-backdrop" (click)="closeOnBackdrop && closed.emit()">
        <section class="dialog-card" [class.large]="size === 'large'" [class.full]="size === 'full'" (click)="$event.stopPropagation()" role="dialog" aria-modal="true">
          <header class="dialog-header">
            <div><small>{{ eyebrow }}</small><h2>{{ title }}</h2></div>
            <button class="icon-btn" type="button" aria-label="بستن" (click)="closed.emit()">×</button>
          </header>
          <div class="dialog-body"><ng-content></ng-content></div>
          <footer class="dialog-actions">
            <button class="btn ghost" type="button" (click)="cancel.emit(); closed.emit()">{{ cancelLabel }}</button>
            <button class="btn primary" type="button" [disabled]="loading" (click)="confirm.emit()">{{ loading ? 'در حال انجام...' : confirmLabel }}</button>
          </footer>
        </section>
      </div>
    }
  `
})
export class BaseDialogComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() eyebrow = 'Dental UI';
  @Input() confirmLabel = 'تایید';
  @Input() cancelLabel = 'لغو';
  @Input() loading = false;
  @Input() closeOnBackdrop = true;
  @Input() size: 'small' | 'large' | 'full' = 'small';
  @Output() closed = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
