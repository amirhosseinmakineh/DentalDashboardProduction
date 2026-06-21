import { Component, signal } from '@angular/core';
import { BaseDialogComponent } from './base/base-dialog/base-dialog.component';
import { BaseToastComponent } from './base/base-toast/base-toast.component';
import { BaseToastService } from './base/base-toast/base-toast.service';

@Component({
  selector: 'app-root',
  imports: [BaseDialogComponent, BaseToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly infoOpen = signal(false);

  constructor(private readonly toast: BaseToastService) {}

  showBaseToast() {
    this.toast.info('سیستم پایه فعال است');
  }
}
