import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Render,
  Res,
} from '@nestjs/common';
import { CategoryService } from './categories.service';

@Controller('/categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  @Render('categories')
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
