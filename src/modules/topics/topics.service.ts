import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Topic } from './models';
import { Model } from 'mongoose';
import { CreateTopicDto, UpdateTopicDto } from './dtos';
import { Category } from '../categories';

@Injectable()
export class TopicService {
  constructor(
    @InjectModel(Topic.name) private readonly topicModel: Model<Topic>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async getAll() {
    const data = await this.topicModel
      .find()
      .populate('category', 'name')
      .exec();
    return {
      success: true,
      data,
    };
  }

  async getOne(id: string) {
    const data = await this.topicModel
      .findById(id)
      .populate('category', 'name')
      .exec();

    if (!data) throw new NotFoundException('Топик не найден');

    return {
      success: true,
      data,
    };
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async getAllWithCategories(): Promise<Topic[]> {
    return this.topicModel.find().populate('category').exec();
  }

  async create(payload: CreateTopicDto) {
    const existing = await this.topicModel.findOne({ slug: payload.slug });

    if (existing)
      throw new ConflictException('Топик с таким slug уже существует');

    const data = await this.topicModel.create(payload);

    return {
      success: true,
      data,
    };
  }

  async update(id: string, payload: UpdateTopicDto) {
    if (payload.slug) {
      const existing = await this.topicModel.findOne({
        slug: payload.slug,
        _id: { $ne: id },
      });

      if (existing)
        throw new ConflictException('Топик с таким slug уже существует');
    }

    const data = await this.topicModel
      .findByIdAndUpdate(id, payload, {
        new: true,
      })
      .populate('category', 'name')
      .exec();

    if (!data) throw new NotFoundException('Топик не найден');

    return {
      success: true,
      data,
    };
  }

  async delete(id: string) {
    const data = await this.topicModel.findByIdAndDelete(id).exec();

    if (!data) throw new NotFoundException('Топик не найден');

    return {
      success: true,
      message: 'Топик успешно удалён',
      data,
    };
  }
}
