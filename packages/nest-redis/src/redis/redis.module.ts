import { RedisOptions } from 'ioredis';
import { DynamicModule, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({})
export class RedisModule {
  static forRootAsync(options: RedisOptions): DynamicModule {
    return {
      module: RedisModule,
      global: true,
      providers: [
        { provide: RedisService, useFactory: () => new RedisService(options) },
      ],
      exports: [RedisService],
    };
  }
}
