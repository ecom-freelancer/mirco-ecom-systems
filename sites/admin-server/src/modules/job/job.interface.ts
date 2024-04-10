import { JbStatus } from '@packages/nest-mysql';

export interface ITask<T = any> {
  payload: T;
  jobId: number;
}

export interface IJobCache<T = any, Result = any> {
  taskLogs: ITaskLog<Result>[];
  params: T;
}

export interface ITaskLog<Result = any> {
  id?: string;
  message?: string;
  status?: JbStatus;
  result?: Result;
  executeAt?: number;
}
