import { Injectable } from '@nestjs/common';
import { RedisKeyPrefix, RedisService } from '@packages/nest-redis';

@Injectable()
export class SessionService {
  constructor(private readonly redisService: RedisService) {}

  async clearAllSession(userId: string): Promise<void> {
    const keys = await this.redisService._keys(
      `${RedisKeyPrefix.SESSION}:${userId}:*`,
    );

    await Promise.allSettled(
      keys.map((key: string) => this.redisService._del(key)),
    );
  }
}
