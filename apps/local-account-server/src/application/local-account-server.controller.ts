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
import { QueryDto } from './dto/index.dto';
import { LocalAccountServerService } from './local-account-server.service';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('account')
export class LocalAccountServerController {
  constructor(
    private readonly localAccountServerService: LocalAccountServerService,
  ) {}

  @Get()
  @Render('index')
  index() {
    return;
  }

  @Post()
  @Render('concern')
  async concern(@Query() query: QueryDto, @Body() body: LoginDto) {
    const code = await this.localAccountServerService.getCode(body);
    return { ...query, code };
  }
}
