import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { IndexDto } from './dto/index.dto';
import { LocalAccountServerService } from './local-account-server.service';
import { Request, Response } from 'express';

@Controller('account')
export class LocalAccountServerController {
  constructor(
    private readonly localAccountServerService: LocalAccountServerService,
  ) {}

  @Get()
  @Render('index')
  index(@Res() res: Response, @Req() req: Request) {
    return;
  }

  @Post()
  @Render('concern')
  concern(
    @Query() query: IndexDto,
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return { ...query, code: '5555' };
  }
}
