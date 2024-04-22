import { VerificationCodeEntity } from '../entities/verification-code.entity';

export class VVerificationCode implements VerificationCodeEntity {
  uuid: string;
  codeVerifier: string;
  redirectUri: string;
  codeChallenge: string;

  constructor(
    state: string,
    codeVerifier: string,
    redirectUri: string,
    codeChallenge: string,
  ) {
    this.uuid = state;
    this.codeVerifier = codeVerifier;
    this.redirectUri = redirectUri;
    this.codeChallenge = codeChallenge;
  }
}
