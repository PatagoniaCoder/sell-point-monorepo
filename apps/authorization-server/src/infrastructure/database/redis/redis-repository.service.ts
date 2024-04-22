import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { VerificationCodeEntity } from 'apps/authorization-server/src/domain/entities/verification-code.entity';
import { VerificationCodeRepository } from 'apps/authorization-server/src/domain/repositories/verification-code.repository';
import { VVerificationCode } from 'apps/authorization-server/src/domain/value-objects/verification-code.value';

@Injectable()
export class RedisRepositoryService implements VerificationCodeRepository {
  private expireTime: number;
  constructor(
    @InjectRedis('CODE_VERIFY_DB') private readonly redis: Redis,
    private readonly configService: ConfigService,
  ) {
    this.expireTime = this.configService.get<number>(
      'REDIS_CODE_VERIFY_EXPIRATION',
    );
  }

  async saveCodeVerify(value: VVerificationCode): Promise<void> {
    const { uuid } = value;
    await this.redis
      .multi()
      .set(uuid, JSON.stringify({ ...value }))
      .expire(uuid, this.expireTime)
      .exec();
  }

  async findCodeVerify(uuid: string): Promise<VerificationCodeEntity | null> {
    const value = await this.redis.get(uuid);
    if (!value) return null;
    const { codeVerifier, redirectUri }: VerificationCodeEntity =
      JSON.parse(value);
    const codeVerifyObject = new VVerificationCode(
      uuid,
      codeVerifier,
      redirectUri,
    );
    return codeVerifyObject;
  }
}
