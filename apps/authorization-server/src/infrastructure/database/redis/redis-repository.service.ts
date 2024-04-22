import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CodeVerifyRepository } from 'apps/authorization-server/src/domain/repositories/code-verifier.repository';
import { VCodeVerify } from 'apps/authorization-server/src/domain/value-objects/code-verify.value';
import { Redis } from 'ioredis';

@Injectable()
export class RedisRepositoryService implements CodeVerifyRepository {
  private expireTime: number;
  constructor(
    @InjectRedis('CODE_VERIFY_DB') private readonly redis: Redis,
    private readonly configService: ConfigService,
  ) {
    this.expireTime = this.configService.get<number>(
      'REDIS_CODE_VERIFY_EXPIRATION',
    );
  }

  async saveCodeVerify(value: VCodeVerify): Promise<void> {
    const { codeChallenge, codeVerifier, uuid, redirectUri } = value;
    await this.redis
      .multi()
      .set(uuid, JSON.stringify({ ...value }))
      .expire(uuid, this.expireTime)
      .exec();
  }

  async findCodeVerify(uuid: string): Promise<any> {
    return await this.redis.get(uuid);
  }

  deleteCodeVerify(uuid: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
