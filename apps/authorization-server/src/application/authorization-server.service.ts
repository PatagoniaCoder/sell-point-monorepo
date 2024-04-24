import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRandomValues } from 'crypto';
import { ClientRepository } from '../domain/repositories/client.repository';
import { VerificationCodeRepository } from '../domain/repositories/verification-code.repository';
import { VVerificationCode } from '../domain/value-objects/verification-code.value';

@Injectable()
export class AuthorizationServerService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly verificationCodeRepository: VerificationCodeRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async generateAuthorizationUrl(
    clientId: string,
    scope: string,
  ): Promise<string> {
    const client = await this.clientRepository.findClientById(clientId);
    if (!client) {
      throw new BadRequestException('Client does not exist');
    }
    if (!client.scope.includes(scope)) {
      throw new BadRequestException('Scope not permitted');
    }
    const state = this.generateRandomString(5);
    const codeVerifier = this.generateRandomString(12);
    const codeChallenge = this.sha256(codeVerifier);
    const codeVerifyObject = new VVerificationCode(
      state,
      codeVerifier,
      client.redirectUri,
    );
    await this.verificationCodeRepository.saveCodeVerify(codeVerifyObject);
    const authorizationUrl = `${this.configService.get(
      'LOCAL_ACCOUNT_SERVER_URL',
    )}/account?response_type=code&client_id=${clientId}&code_challenge=${codeChallenge}&code_challenge_method=S256&state=${state}&redirect=${this.configService.get(
      'AUTHORIZATION_SERVER_URL',
    )}/authorization/token`;
    return authorizationUrl;
  }

  async exchangeCodeForToken(
    state: string,
    clientId: string,
    codeChallenge: string,
    code: string,
  ) {
    const value = await this.verificationCodeRepository.findCodeVerify(state);
    if (!value) {
      throw new BadRequestException('Verification Code does not exist');
    }
    const storeCodeChallenge = this.sha256(value.codeVerifier);
    if (codeChallenge !== storeCodeChallenge) {
      throw new BadRequestException('Bad Code Challenge');
    }
    const client = await this.clientRepository.findClientById(clientId);
    if (!client) {
      throw new BadRequestException('Client does not exist');
    }
    const token = await this.jwtService.signAsync({ clientId, code });
    return { token, redirectUri: client.redirectUri };
  }

  private hex2bin(s: string) {
    const ret = [];
    let i = 0;
    let l = 0;

    s += '';

    for (l = s.length; i < l; i += 2) {
      const c = parseInt(s.substring(i, i + 1), 16);
      const k = parseInt(s.substring(i + 1, i + 2), 16);

      if (isNaN(c) || isNaN(k)) continue;
      ret.push((c << 4) | k);
    }

    return String.fromCharCode(...ret);
  }

  private dec2hex(dec: number) {
    return ('0' + dec.toString(16)).substring(-2);
  }

  private dec2bin(arr: Uint8Array) {
    return this.hex2bin(Array.from(arr, this.dec2hex).join(''));
  }

  private base64_urlencoded(str: string | boolean) {
    return btoa(str.toString())
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private generateRandomString(len: number): string {
    const arr = new Uint8Array(len);
    getRandomValues(arr);
    const str = this.base64_urlencoded(this.dec2bin(arr));
    return str.substring(0, len);
  }

  private rightRotate(value: number, amount: number) {
    return (value >>> amount) | (value << (32 - amount));
  }

  private sha256(ascii: string): string {
    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    let j: number = 0;
    let result = '';
    const words = [];
    let asciiBitLength: number = 0;
    const k = [];
    let hash = [];
    let primeCounter = 0;
    const isComposite = [];
    asciiBitLength = ascii.length * 8;
    ascii += '\x80';
    while ((ascii.length % 64) - 56) ascii += '\x00';

    for (let candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (let i = 0; i < 313; i += candidate) {
          isComposite[i] = candidate;
        }
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }
    for (let i = 0; i < ascii.length; i++) {
      j = ascii.charCodeAt(i);
      if (j >> 8) return;
      words[i >> 2] |= j << (((3 - i) % 4) * 8);
    }
    words[words.length] = (asciiBitLength / maxWord) | 0;
    words[words.length] = asciiBitLength;

    for (j = 0; j < words.length; ) {
      const w = words.slice(j, (j += 16));
      const oldHash = hash;

      hash = hash.slice(0, 8);

      for (let i = 0; i < 64; i++) {
        const w15 = w[i - 15],
          w2 = w[i - 2];

        const a = hash[0],
          e = hash[4];
        const temp1 =
          hash[7] +
          (this.rightRotate(e, 6) ^
            this.rightRotate(e, 11) ^
            this.rightRotate(e, 25)) +
          ((e & hash[5]) ^ (~e & hash[6])) +
          k[i] +
          (w[i] =
            i < 16
              ? w[i]
              : (w[i - 16] +
                  (this.rightRotate(w15, 7) ^
                    this.rightRotate(w15, 18) ^
                    (w15 >>> 3)) +
                  w[i - 7] +
                  (this.rightRotate(w2, 17) ^
                    this.rightRotate(w2, 19) ^
                    (w2 >>> 10))) |
                0);
        const temp2 =
          (this.rightRotate(a, 2) ^
            this.rightRotate(a, 13) ^
            this.rightRotate(a, 22)) +
          ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));

        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }

      for (let i = 0; i < 8; i++) {
        hash[i] = (hash[i] + oldHash[i]) | 0;
      }
    }

    for (let i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
        const b = (hash[i] >> (j * 8)) & 255;
        result += (b < 16 ? 0 : '') + b.toString(16);
      }
    }
    return result;
  }
}
