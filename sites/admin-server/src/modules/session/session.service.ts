import { Injectable } from '@nestjs/common';
import { RedisKeyPrefix, RedisService } from '@packages/nest-redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async clearAllSession(userId: string): Promise<void> {
    const keys = await this.redisService._keys(
      `${RedisKeyPrefix.SESSION}:${userId}:*`,
    );

    await Promise.allSettled(
      keys.map((key: string) => this.redisService._del(key)),
    );
  }

  async storeSession(userId: string, sessionId: string): Promise<void> {
    await this.redisService._setex(
      `${RedisKeyPrefix.SESSION}:${userId}:${sessionId}`,
      this.configService.get('ACCESS_TOKEN_VALID_DURATION') * 24 * 60 * 60,
      '',
    );
  }

  async checkSessionExists(userId: string, sessionId: string): Promise<number> {
    return await this.redisService._exists(
      `${RedisKeyPrefix.SESSION}:${userId}:${sessionId}`,
    );
  }

  async deleteSession(userId: string, sessionId: string) {
    await this.redisService._del(
      `${RedisKeyPrefix.SESSION}:${userId}:${sessionId}`,
    );
  }
}
