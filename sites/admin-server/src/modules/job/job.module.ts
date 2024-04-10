import { BullModule } from '@nestjs/bullmq';
import { DynamicModule, Module } from '@nestjs/common';
import { RedisModule, RedisService } from '@packages/nest-redis';

@Module({})
export class JobModule {
  static forRootAsync(): DynamicModule {
    return {
      module: JobModule,
      imports: [
        BullModule.forRootAsync({
          imports: [RedisModule],
          useFactory: async (redisService: RedisService) => {
            return {
              connection: redisService.redis,
              defaultJobOptions: {
                removeOnComplete: true,
                removeOnFail: true,
                attempts: 3,
                backoff: { type: 'exponential', delay: 600000 }, // 600000ms = 10 mins
              },
            };
          },
          inject: [RedisService],
        }),
      ],
    };
  }
}
