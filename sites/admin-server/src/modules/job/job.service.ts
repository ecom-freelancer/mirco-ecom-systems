import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import {
  InjectDataSource,
  InjectRepository,
  JbStatus,
  JobEntity,
} from '@packages/nest-mysql';
import { DataSource, Repository } from 'typeorm';
import { Job, Queue } from 'bullmq';
import { InitJobDto, UpdateJobDto } from './job.dto';
import { IJobCache, ITask, ITaskLog } from './job.interface';
import { RedisService } from '@packages/nest-redis';
import { JOB_QUEUE } from './job.processor';

const JOB_CACHE_KEY = 'APP_JOB';

const getJobCacheKey = (jobId: any) => `${JOB_CACHE_KEY}:${jobId}`;

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectQueue(JOB_QUEUE)
    private readonly queueService: Queue<ITask>,
    private readonly redisService: RedisService,
  ) {}

  async initJob<Data = any>(payload: InitJobDto, tasks: Data[]) {
    //transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newJob = await queryRunner.manager.save(JobEntity, {
        target: payload.target,
        action: payload.action,
        title: payload.title,
        source: payload.source,
        totalTask: tasks.length,
        status: JbStatus.pending,
        executedAt: null,
        completedAt: null,
        failedTask: 0,
        completedTask: 0,
        id: payload.id,
      });

      const jobTasks = tasks.map((task) => {
        return {
          name: payload.action,
          data: {
            jobId: newJob.id,
            payload: task,
          },
        } as Job<ITask<Data>>;
      });

      await this.queueService.addBulk(jobTasks);

      await queryRunner.commitTransaction();
      return newJob;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async retryJob<Data = any>(jobId: number, tasks: Data[]) {
    const job = await this.jobRepository.findOne({
      where: {
        id: jobId,
      },
    });
    await this.cancelJob(jobId);

    await this.initJob(
      {
        id: job.id,
        source: job.source,
        title: job.title,
        action: job.action,
        target: job.target,
      },
      tasks,
    );
  }

  async cancelJob(jobId: number) {
    const jobs = await this.queueService.getJobs('delayed');
    const deleteJobs = jobs.filter((job) => job.data.jobId === jobId);
    if (deleteJobs) {
      await Promise.all(deleteJobs.map((job) => job.remove()));
    }
    // clear cache
    await this.redisService._del(getJobCacheKey(jobId));
  }

  async updateJob(payload: UpdateJobDto) {
    return this.jobRepository.update(
      {
        id: payload.id,
      },
      {
        ...payload,
      },
    );
  }

  async addLogs(jobId: number, log: ITaskLog) {
    try {
      const jobCache = await this.redisService.fromCache<IJobCache<ITaskLog>>(
        getJobCacheKey(jobId),
      );

      await this.redisService.cache<IJobCache<ITaskLog>>(
        getJobCacheKey(jobId),
        {
          ...jobCache,
          taskLogs: [...jobCache.taskLogs, log],
        },
      );
    } catch (e) {
      console.error('[Job] Add logs fail.');
    }
  }

  async executeTask<Result>(
    jobId: number,
    executeFunction: () => Promise<Result>,
    taskId: string,
  ) {
    try {
      // get job from cache

      const now = Date.now();
      const job = await this.jobRepository.findOne({
        where: {
          id: jobId,
        },
      });

      const isLastJob =
        job.totalTask === job.completedTask + job.completedTask + 1;

      if (
        job.status === JbStatus.completed ||
        job.status === JbStatus.canceled
      ) {
        return;
      }

      // update job status to processing
      if (job.status === JbStatus.pending)
        await this.updateJob({
          id: jobId,
          status: JbStatus.processing,
          executedAt: Date.now(),
        });

      try {
        const result = await executeFunction();
        const newCompletedTask = job.completedTask + 1;
        const newStatus = isLastJob
          ? job.totalTask == newCompletedTask
            ? JbStatus.completed
            : JbStatus.failed
          : JbStatus.processing;

        await this.updateJob({
          id: jobId,
          completedTask: job.completedTask + 1,
          status: newStatus,
        });

        await this.addLogs(jobId, {
          status: JbStatus.completed,
          id: taskId,
          result,
          message: `Task complete`,
          executeAt: now,
        });

        // update completed task
      } catch (e) {
        const newStatus = isLastJob ? JbStatus.failed : JbStatus.processing;

        await this.updateJob({
          id: jobId,
          failedTask: job.failedTask + 1,
          status: newStatus,
        });

        await this.addLogs(jobId, {
          status: JbStatus.failed,
          id: taskId,
          message: e.message,
          executeAt: now,
        });
      }
      if (isLastJob) {
        await this.updateJob({
          id: jobId,
          completedAt: Date.now(),
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getResultOfJob<Result>(jobId: number) {
    const jobCache = await this.redisService.fromCache<IJobCache<Result>>(
      getJobCacheKey(jobId),
    );

    if (!jobCache) return null;
    return jobCache.taskLogs.map((i) => i.result).filter((i) => !!i);
  }
}
