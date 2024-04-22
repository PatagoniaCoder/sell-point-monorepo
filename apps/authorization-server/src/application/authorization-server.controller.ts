import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthorizationServerService } from './authorization-server.service';

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
    const { token, redirectUri } = await this.appService.exchangeCodeForToken(
      state,
      clientId,
      codeChallenge,
      code,
    );
    res.redirect(`${redirectUri}?token=${token}`);
  }
}
