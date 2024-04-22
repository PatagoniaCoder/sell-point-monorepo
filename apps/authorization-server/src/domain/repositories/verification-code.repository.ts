import { VerificationCodeEntity } from '../entities/verification-code.entity';
import { VVerificationCode } from '../value-objects/verification-code.value';

export interface VerificationCodeRepository {
  findCodeVerify(uuid: string): Promise<VerificationCodeEntity | null>;
  saveCodeVerify(value: VVerificationCode): Promise<void>;
}
