import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { CryptographyService } from './util/cryptography.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LocalAccountServerService {
  constructor(
    private readonly cryptographyService: CryptographyService,
    private readonly httpService: HttpService,
  ) {}

  async getCode(body: LoginDto): Promise<any> {
    const userValid = await firstValueFrom(
      this.httpService
        .post('/login', body)
        .pipe(map(({ status }) => (status === HttpStatus.CREATED ? true : false))),
    );
    if (!userValid) {
      throw new ForbiddenException('User or pass not valid');
    }
    const code = this.cryptographyService.generateRandomString(15);
    return code;
  }
}
