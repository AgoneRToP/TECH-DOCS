import { Protected } from '@/common/decorators';
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Protected(true)
  @Get()
  async getAll() {
    return [];
  }
}
