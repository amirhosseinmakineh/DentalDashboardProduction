import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TableColumn { key: string; title: string; }
export interface TableAction { key: string; title: string; }

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: Record<string, unknown>[] = [];
  @Input() loading = false;
  @Input() actions: TableAction[] = [];
  @Output() actionClick = new EventEmitter<{ action: string; row: Record<string, unknown> }>();
}
