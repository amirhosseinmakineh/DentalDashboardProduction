import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { BaseToastService } from './base-toast.service';

@Component({
  selector: 'app-base-toast',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="toast-stack" aria-live="polite">
      <button *ngFor="let toast of toastService.toasts()" class="toast" [class]="'toast ' + toast.type" (click)="toastService.dismiss(toast.id)">
        <span>{{ icon(toast.type) }}</span>
        <b>{{ toast.message }}</b>
      </button>
    </div>
  `
})
export class BaseToastComponent {
  readonly toastService = inject(BaseToastService);
  icon(type: string) { return type === 'success' ? '✓' : type === 'error' ? '!' : type === 'warning' ? '⚠' : 'i'; }
}
