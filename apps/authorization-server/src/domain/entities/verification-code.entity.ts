export interface VerificationCodeEntity {
  uuid: string;
  codeVerifier: string;
  redirectUri: string;
}
