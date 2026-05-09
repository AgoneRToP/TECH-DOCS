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

@Controller('/topics')
export class TopicController {
  constructor(private readonly service: TopicService) {}

  @Get('/create')
  @Render('create-topic')
  async renderCreatePage() {
    return { title: 'Create Topic' };
  }

  @Get()
  @Render('topics')
  async getAll() {
    const topics = await this.service.getAll();
    return { topics };
  }

  // @Get('/:id')
  // async getOne(@Param('id', ParseObjectIdPipe) id: string) {
  //   return await this.service.getOne(id);
  // }

  @Get('/:id')
  @Render('topic-detail')
  async getOne(@Param('id') id: string) {
    const allTopics = await this.service.getAll();
    const currentTopic = await this.service.getOne(id);
    return { topics: allTopics, topic: currentTopic };
  }

  // @Get('/create')
  // @Render('topic-form')
  // async renderCreateForm() {
  //   return { title: 'Создать новый топик' };
  // }

  @Post()
  async create(@Body() payload: CreateTopicDto) {
    return await this.service.create(payload);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() payload: UpdateTopicDto,
  ) {
    return await this.service.update(id, payload);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.service.delete(id);
  }
}
