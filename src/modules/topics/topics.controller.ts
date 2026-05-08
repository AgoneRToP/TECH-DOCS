import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TopicService } from './topics.service';
import { CreateTopicDto, UpdateTopicDto } from './dtos';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('/topics')
export class TopicController {
  constructor(private readonly service: TopicService) {}

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.service.getOne(id);
  }

  @Post()
  async create(@Body() payload: CreateTopicDto) {
    return await this.service.create(payload);
  }

  @Put('/:id')
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() payload: UpdateTopicDto) {
    return await this.service.update(id, payload);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.service.delete(id);
  }
}
