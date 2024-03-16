import * as dotenv from 'dotenv';
import { RedisOptions } from 'ioredis';

dotenv.config({
  path: '.env.local',
});

export const getRedisOptions = (): RedisOptions => {
  return {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT),
  };
};
