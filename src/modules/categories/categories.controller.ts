import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('/categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.service.getOne(id);
  }

  @Post()
  async create(@Body() payload: CreateCategoryDto) {
    return await this.service.create(payload);
  }

  @Put('/:id')
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() payload: UpdateCategoryDto) {
    return await this.service.update(id, payload);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.service.delete(id);
  }
}
