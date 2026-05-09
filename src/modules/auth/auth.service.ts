import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto, RegisterDto } from './dtos';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async register(payload: RegisterDto) {
    const existing = await this.userModel.findOne({ email: payload.email });

    if (existing)
      throw new ConflictException(
        'Указанная электронная почта: уже используется',
      );

    const hashedPass = await this.hashPass(payload.password);

    const user = await this.userModel.create({
      username: payload.username,
      email: payload.email,
      password: hashedPass,
    });

    const { password, ...result } = user.toObject();

    return {
      success: true,
      data: result,
    };
  }

  async login(payload: LoginDto) {
    const existing = await this.userModel.findOne({ email: payload.email });

    if (!existing) throw new UnauthorizedException('Неверная почта или пароль');

    const comparePass = await this.comparePass(
      payload.password,
      existing.password,
    );

    if (!comparePass) {
      throw new UnauthorizedException('Неверная почта или пароль');
    }

    const { password, ...result } = existing.toObject();

    return {
      success: true,
      data: result,
    };
  }

  private async hashPass(password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  }

  private async comparePass(originalPass: string, hashedPass: string) {
    const isSame = await bcrypt.compare(originalPass, hashedPass);

    return isSame;
  }
}
