import { Injectable } from '@nestjs/common';
import { getRandomValues } from 'crypto';

@Injectable()
export class CryptographyService {
  generateRandomString(len: number): string {
    const arr = new Uint8Array(len);
    getRandomValues(arr);
    const str = this.base64_urlencoded(this.dec2bin(arr));
    return str.substring(0, len);
  }

  private base64_urlencoded(str: string | boolean) {
    return btoa(str.toString()).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

  private dec2bin(arr: Uint8Array) {
    return this.hex2bin(Array.from(arr, this.dec2hex).join(''));
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
}
