import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AdminService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos';

@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AdminService) {}

  @Post('register')
  async register(@Body() payload: RegisterDto) {
    return await this.service.register(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginDto) {
    return await this.service.login(payload);
  }
}
