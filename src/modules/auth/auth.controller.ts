import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos';
import type { Response } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  async register(@Body() payload: RegisterDto, @Res() res: Response) {
    return await this.service.register(payload, res);
  }

  @Post('login')
  async login(@Body() payload: LoginDto, @Res() res: Response) {
    return await this.service.login(payload, res);
  }
}
