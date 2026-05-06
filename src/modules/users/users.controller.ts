import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
} from '@nestjs/common';
import { UserService } from './users.service';

@Controller('/users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @Render('users')
  async getAll() {
    return await this.service.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.service.getOne(id);
  }

  @Post()
  async create(@Body() payload: any) {
    return await this.service.create(payload);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() payload: any) {
    return await this.service.update(id, payload);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
