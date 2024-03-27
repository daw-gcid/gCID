import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from './guards';
import { LocalAuthGuard } from './local-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  status(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  logout(@Req() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
