import { VVerificationCode } from '../value-objects/verification-code.value';

export interface VerificationCodeRepository {
  findCodeVerify(uuid: string): Promise<any>;
  saveCodeVerify(value: VVerificationCode): Promise<void>;
}
