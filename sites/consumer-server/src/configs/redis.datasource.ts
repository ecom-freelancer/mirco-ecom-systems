import { RedisOptions } from 'ioredis';
import { envLoader } from '@packages/nest-helper';

envLoader();
export const getRedisOptions = (): RedisOptions => {
  return {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT),
  };
};
