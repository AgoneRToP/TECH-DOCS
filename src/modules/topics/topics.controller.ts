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
import { TopicService } from './topics.service';
import { CreateTopicDto, UpdateTopicDto } from './dtos';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('admin/topics')
export class TopicController {
  constructor(private readonly service: TopicService) {}

  @Get('/create')
  @Render('admin/topics/create')
  async renderCreatePage() {
    const categories = await this.service.getCategories();
    return {
      title: 'Create Topic',
      categories,
    };
  }

  @Get()
  @Render('admin/topics/index')
  async getAll() {
    const topics = await this.service.getAllWithCategories();
    return { topics };
  }

  @Get(':id')
  @Render('admin/topics/edit')
  async getOne(@Param('id', ParseObjectIdPipe) id: string) {
    const topic = await this.service.getOne(id);
    const categories = await this.service.getCategories();
    return { topic, categories };
  }

  @Post()
  async create(@Body() payload: CreateTopicDto) {
    const result = await this.service.create(payload);
    return result;
  }

  @Put(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() payload: UpdateTopicDto,
  ) {
    const result = await this.service.update(id, payload);
    return result;
  }

  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    await this.service.delete(id);
    return { message: 'Topic deleted successfully' };
  }
}
