import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthApiService } from './auth-api.service';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthApiController {
  constructor(private readonly authApiService: AuthApiService) {}

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this.authApiService.validate(body);
  }
}
