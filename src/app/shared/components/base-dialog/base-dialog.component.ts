import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-dialog.component.html',
  styleUrl: './base-dialog.component.css'
})
export class BaseDialogComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() loading = false;
  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
}
