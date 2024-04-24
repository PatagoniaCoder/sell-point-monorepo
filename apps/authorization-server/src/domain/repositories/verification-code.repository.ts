import { VerificationCodeEntity } from '../entities/verification-code.entity';
import { VVerificationCode } from '../value-objects/verification-code.value';

export abstract class VerificationCodeRepository {
  abstract findCodeVerify(uuid: string): Promise<VerificationCodeEntity | null>;
  abstract saveCodeVerify(value: VVerificationCode): Promise<void>;
}
