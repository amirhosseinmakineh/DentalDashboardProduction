import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export interface ToastMessage { id: number; type: ToastType; message: string; }

@Injectable({ providedIn: 'root' })
export class BaseToastService {
  readonly toasts = signal<ToastMessage[]>([]);
  private nextId = 1;

  success(message: string) { this.show('success', message); }
  error(message: string) { this.show('error', message); }
  warning(message: string) { this.show('warning', message); }
  info(message: string) { this.show('info', message); }

  private show(type: ToastType, message: string) {
    const toast = { id: this.nextId++, type, message };
    this.toasts.update((items) => [...items, toast]);
    setTimeout(() => this.dismiss(toast.id), 2600);
  }

  dismiss(id: number) { this.toasts.update((items) => items.filter((toast) => toast.id !== id)); }
}
