import { RedisKeyPrefix } from '../constants';

export const getResetPasswordRedisKey = (account: string) => {
  return `${RedisKeyPrefix.RESET_PASSWORD}:${account}`;
};
