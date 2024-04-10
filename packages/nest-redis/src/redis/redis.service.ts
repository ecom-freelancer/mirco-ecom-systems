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

  async fromRedisCache<T extends object>(
    key: string,
    fetcher: () => Promise<T>,
    cacheTime = 10 * 60,
  ): Promise<T> {
    try {
      const valueInCache = await this.redis.getex(key);

      if (!!valueInCache) {
        return JSON.parse(valueInCache) as T;
      }

      const res = await fetcher();

      if (Array.isArray(res)) {
        (res as any).length &&
          (await this.redis.setex(key, cacheTime, JSON.stringify(res)));
        return res;
      } else {
        await this.redis.setex(key, cacheTime, JSON.stringify(res));
        return res;
      }
    } catch (e) {
      console.error('Get value from redis fail.');
      console.error(e);
      return fetcher();
    }
  }

  async cache<T extends any>(key: string, value: T, cacheTime = 10 * 60) {
    try {
      if (Array.isArray(value)) {
        (value as any).length &&
          (await this.redis.setex(key, cacheTime, JSON.stringify(value)));
      } else {
        await this.redis.setex(key, cacheTime, JSON.stringify(value));
      }
    } catch (e) {}
  }

  async fromCache<T extends any>(key: string): Promise<T> {
    try {
      const valueInCache = await this.redis.getex(key);

      if (!!valueInCache) {
        return JSON.parse(valueInCache) as T;
      }

      return null;
    } catch (e) {
      console.error('Get value from redis fail.');
      console.error(e);
      return null;
    }
  }
}
