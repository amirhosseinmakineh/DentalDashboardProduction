import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-dialog',
  standalone: true,
  template: `
    @if (open) {
      <div class="dialog-backdrop" (click)="closeOnBackdrop && closed.emit()">
        <section class="dialog-card" (click)="$event.stopPropagation()" role="dialog" aria-modal="true">
          <header class="dialog-header"><h2>{{ title }}</h2><button class="icon-btn" (click)="closed.emit()">×</button></header>
          <div class="dialog-body"><ng-content></ng-content></div>
          <footer class="dialog-actions"><button class="btn ghost" (click)="closed.emit()">{{ cancelLabel }}</button><button class="btn primary" [disabled]="loading">{{ loading ? 'در حال انجام...' : confirmLabel }}</button></footer>
        </section>
      </div>
    }
  `
})
export class BaseDialogComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() confirmLabel = 'تایید';
  @Input() cancelLabel = 'لغو';
  @Input() loading = false;
  @Input() closeOnBackdrop = true;
  @Output() closed = new EventEmitter<void>();
}
