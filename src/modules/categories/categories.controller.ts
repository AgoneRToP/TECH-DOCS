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
import { Roles, RolesEnum } from '@/common/decorators';

@Controller('admin/categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  async getAll() {
    const result = await this.service.getAll();
    return result;
  }

  @Get(':id')
  async getOne(@Param('id', ParseObjectIdPipe) id: string) {
    const result = await this.service.getOne(id);
    return result;
  }

  @Post()
  @Roles(RolesEnum.admin)
  async create(@Body() payload: CreateCategoryDto) {
    const result = await this.service.create(payload);
    return result;
  }

  @Put(':id')
  @Roles(RolesEnum.admin)
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() payload: UpdateCategoryDto
  ) {
    const result = await this.service.update(id, payload);
    return result;
  }

  @Delete(':id')
  @Roles(RolesEnum.admin)
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    await this.service.delete(id);
    return {
      success: true,
      message: 'Категория успешно удалена',
    };
  }
}
