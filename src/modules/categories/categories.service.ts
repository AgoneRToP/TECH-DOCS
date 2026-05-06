import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './models/categories.model';
import { isObjectIdOrHexString, Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async getAll() {
    const categories = await this.categoryModel.find();
    return {
      success: true,
      data: categories,
    };
  }

  async getOne(id: string) {
    if (!isObjectIdOrHexString(id)) {
      throw new BadRequestException('ID format error');
    }

    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return {
      success: true,
      data: category,
    };
  }

  async create({
    name,
    icon,
    category,
  }: {
    name: string;
    icon?: string;
    category?: string;
  }) {
    const existing = await this.categoryModel.findOne({ name });

    if (existing) {
      throw new ConflictException('Category already exists');
    }

    const newCategory = await this.categoryModel.create({
      name,
      category,
      icon,
    });

    return {
      success: true,
      data: newCategory,
    };
  }

  async update(
    id: string,
    {
      name,
      icon,
      category,
    }: { name: string; icon?: string; category?: string },
  ) {
    if (!isObjectIdOrHexString(id)) {
      throw new BadRequestException('ID format error');
    }

    if (name) {
      const existing = await this.categoryModel.findOne({
        name,
        _id: { $ne: id },
      });

      if (existing) {
        throw new ConflictException('Category with this name already exists');
      }
    }

    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      { name, icon, category },
      { new: true },
    );

    if (!updatedCategory) {
      throw new NotFoundException('Category not found');
    }

    return {
      success: true,
      data: updatedCategory,
    };
  }

  async delete(id: string) {
    const categoryId = await this.categoryModel.findByIdAndDelete(id).exec();

    if (!categoryId) {
      throw new NotFoundException('Category not found');
    }

    return {
      success: true,
      data: categoryId,
    };
  }
}
