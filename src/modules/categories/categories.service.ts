import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './models';
import { isObjectIdOrHexString, Model } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async getAll() {
    const data = await this.categoryModel
      .find()
      .populate('parentCategory', 'name');
    return {
      success: true,
      data,
    };
  }

  async getOne(id: string) {
    const data = await this.categoryModel
      .findById(id)
      .populate('parentCategory', 'name');

    if (!data) throw new NotFoundException('Категория не найдена');

    return {
      success: true,
      data,
    };
  }

  async create(payload: CreateCategoryDto) {
    const existing = await this.categoryModel.findOne({ slug: payload.slug });

    if (existing)
      throw new ConflictException('Категория с таким slug уже существует');

    const data = await this.categoryModel.create(payload);

    return {
      success: true,
      data,
    };
  }

  async update(id: string, payload: UpdateCategoryDto) {
    if (payload.slug) {
      const existing = await this.categoryModel.findOne({
        slug: payload.slug,
        _id: { $ne: id },
      });

      if (existing)
        throw new ConflictException('Этот slug уже занят другой категорией');
    }

    const data = await this.categoryModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );

    if (!data) throw new NotFoundException('Категория не найдена');

    return {
      success: true,
      data: data,
    };
  }

  async delete(id: string) {
    const data = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!data) throw new NotFoundException('Категория не найдена');

    return {
      success: true,
      data,
    };
  }
}
