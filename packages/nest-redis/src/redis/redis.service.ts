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

  async _exists(key: string): Promise<number> {
    return this.redisInstance.exists(key);
  }

  async _hset(key: string, data: any): Promise<number> {
    return this.redisInstance.hset(key, data);
  }

  async _hgetall(key: string): Promise<Record<string, string>> {
    return this.redisInstance.hgetall(key);
  }

  async _del(key: string): Promise<number> {
    return this.redisInstance.del(key);
  }

  // time in seconds
  async _setex(key: string, duration: number, value: string) {
    return this.redisInstance.setex(key, duration, value);
  }

  async _keys(pattern: string): Promise<string[]> {
    return this.redisInstance.keys(pattern);
  }
}
