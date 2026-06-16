export type TableActionType = 'view' | 'edit' | 'delete' | 'custom';

export interface ITableAction {
  key: string;
  title: string;
  icon?: string;
  type: TableActionType;
  className?: string;
}
