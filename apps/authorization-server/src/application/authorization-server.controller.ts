import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { AuthorizationServerService } from './authorization-server.service';
import { Request, Response } from 'express';

@Controller('authorization')
export class AuthorizationServerController {
  constructor(private readonly appService: AuthorizationServerService) {}

  @Get()
  async authorize(
    @Query('client_id') clientId: string,
    @Query('scope') scope: string,
  ): Promise<string> {
    return await this.appService.generateAuthorizationUrl(clientId, scope);
  }

  @Get('/token')
  async token(
    @Res() res: Response,
    @Query('state') state: string,
    @Query('client_id') clientId: string,
    @Query('code_challenge') codeChallenge: string,
    @Query('code') code: string,
  ) {
    const token = await this.appService.exchangeCodeForToken(
      state,
      clientId,
      codeChallenge,
      code,
    );
    res.redirect('http://localhost:3000/home');
  }
}
