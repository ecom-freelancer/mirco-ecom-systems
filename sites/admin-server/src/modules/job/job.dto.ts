import { JbStatus, JobAction } from '@packages/nest-mysql';

export class InitJobDto {
  id?: number;

  target: string;

  action: JobAction;

  title?: string;

  source?: string;
}

export class UpdateJobDto {
  id?: number;

  target?: string;

  executedAt?: number;

  completedAt?: number;

  status?: JbStatus;

  title?: string;

  source?: string;

  completedTask?: number;

  totalTask?: number;

  failedTask?: number;
}
