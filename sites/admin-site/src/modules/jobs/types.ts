export enum IJobAction {
  import_inventory_sku = 'import_inventory_sku',
}

export enum IJobStatus {
  pending = 'pending',
  processing = 'processing',
  completed = 'completed',
  failed = 'failed',
  canceled = 'canceled',
}

export interface IJob {
  id: number;
  title?: string;
  status: IJobStatus;
  action: IJobAction;
  jobKey?: string;
  source?: string;
  totalTask?: number;
  completedTask?: number;
  failedTask?: number;
  executedAt?: string;
  completedAt?: string;
}
