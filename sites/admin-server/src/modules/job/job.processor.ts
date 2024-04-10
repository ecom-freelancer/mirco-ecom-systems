import { Processor, WorkerHost } from '@nestjs/bullmq';
import { JobAction } from '@packages/nest-mysql';
import { Job } from 'bullmq';

export const JOB_QUEUE = 'JOB_QUEUE';
@Processor(JOB_QUEUE)
export class JobProcessor extends WorkerHost {
  constructor() {
    super();
  }

  async process(job: Job<any, void, JobAction>, token?: string) {
    switch (job.name) {
      case JobAction.import_inventory_sku:
        return;
      default:
        return;
    }
  }
}
