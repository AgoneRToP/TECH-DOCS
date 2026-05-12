import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto, RegisterDto } from './dtos';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';
import { UserRoles } from '@/core';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(payload: RegisterDto, res: Response) {
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


    const accessToken = await this.generateAccessToken({
      id: user.id,
      role: user.role,
    });

    const refreshToken = await this.generateRefreshToken({
      id: user.id,
      role: user.role,
    });

    res.cookie('accessToken', accessToken, {
      signed: true,
      expires: new Date(
        Date.now() +
          (this.configService.get<number>('ACCESS_TOKEN_EXPIRE_TIME') || 0) *
            1000,
      ),
    });
    res.cookie('refreshToken', refreshToken, { signed: true });

    const { password, ...result } = user.toObject();

    return res.json({
      success: true,
      data: result,
    });
  }

  async login(payload: LoginDto, res: Response) {
    const existing = await this.userModel.findOne({ email: payload.email });

    if (!existing) throw new UnauthorizedException('Неверная почта или пароль');

    const comparePass = await this.comparePass(
      payload.password,
      existing.password,
    );

    if (!comparePass) {
      throw new UnauthorizedException('Неверная почта или пароль');
    }


    const accessToken = await this.generateAccessToken({
      id: existing.id,
      role: existing.role,
    });

    const refreshToken = await this.generateRefreshToken({
      id: existing.id,
      role: existing.role,
    });

    res.cookie('accessToken', accessToken, {
      signed: true,
      expires: new Date(
        Date.now() +
          (this.configService.get<number>('ACCESS_TOKEN_EXPIRE_TIME') || 0) *
            1000,
      ),
    });
    res.cookie('refreshToken', refreshToken, { signed: true });

    const { password, ...result } = existing.toObject();

    return res.json({
      success: true,
      data: result,
    });
  }

  async refresh(req: Request, res: Response) {
    const token = req.signedCookies?.["refreshToken"]

    
  }

  private async hashPass(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  }

  private async comparePass(
    originalPass: string,
    hashedPass: string,
  ): Promise<boolean> {
    const isSame = await bcrypt.compare(originalPass, hashedPass);

    return isSame;
  }

  private async generateAccessToken(payload: { id: string; role: UserRoles }) {
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.access_key'),
      expiresIn: this.configService.get('jwt.access_time'),
    });
    return token;
  }

  private async generateRefreshToken(payload: { id: string; role: UserRoles }) {
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.refresh_key'),
      expiresIn: this.configService.get('jwt.refresh_time'),
    });
    return token;
  }
}
