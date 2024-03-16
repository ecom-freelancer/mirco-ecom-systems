import { Injectable } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisInstance: Redis;

  constructor(redisOptions: RedisOptions) {
    this.redisInstance = new Redis(redisOptions);
  }

  get redis(): Redis {
    return this.redisInstance;
  }
}
