import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './models/users.model';
import { isObjectIdOrHexString, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getAll() {
    const users = await this.userModel.find();
    return {
      success: true,
      data: users,
    };
  }

  async getOne(id: string) {
    if (!isObjectIdOrHexString(id)) {
      throw new BadRequestException('ID format error');
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      success: true,
      data: user,
    };
  }

  async create({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    const existing = await this.userModel.findOne({ email });

    if (existing) {
      throw new ConflictException('User already exists');
    }

    const newUser = await this.userModel.create({
      name,
      email,
      password,
    });

    return {
      success: true,
      data: newUser,
    };
  }

  async update(
    id: string,
    {
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    },
  ) {
    if (!isObjectIdOrHexString(id)) {
      throw new BadRequestException('ID format error');
    }

    if (email) {
      const existing = await this.userModel.findOne({
        email,
        _id: { $ne: id },
      });

      if (existing) {
        throw new ConflictException('User with this name already exists');
      }
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return {
      success: true,
      data: updatedUser,
    };
  }

  async delete(id: string) {
    const userId = await this.userModel.findByIdAndDelete(id).exec();

    if (!userId) {
      throw new NotFoundException('User not found');
    }

    return {
      success: true,
      data: userId,
    };
  }
}
