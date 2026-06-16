import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TableColumn { key: string; title?: string; label?: string; }
export interface TableAction { key: string; title: string; icon?: string; className?: string; }

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() columns: TableColumn[] = [];
  @Input() data: Record<string, unknown>[] = [];
  @Input() loading = false;
  @Input() actions: TableAction[] = [];
  @Input() customActions: TableAction[] = [];
  @Output() actionClick = new EventEmitter<{ action: string; row: Record<string, unknown> }>();
  @Output() customAction = new EventEmitter<{ action: string; row: Record<string, unknown> }>();

  get rowActions(): TableAction[] {
    return this.customActions.length ? this.customActions : this.actions;
  }

  emitAction(action: TableAction, row: Record<string, unknown>): void {
    this.actionClick.emit({ action: action.key, row });
    this.customAction.emit({ action: action.key, row });
  }
}
