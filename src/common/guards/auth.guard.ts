import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PROTECTED_KEY } from '../decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isProtected = this.reflector.get<boolean>(
      PROTECTED_KEY,
      context.getHandler(),
    );

    if (!isProtected) {
      return true;
    }

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request & { user: any }>();

    const token = request.signedCookies?.['accessToken'];

    if (!token) {
      throw new UnauthorizedException('Token not given');
    }

    const decoded = await this.verifyToken(token);

    request.user = decoded;

    return true;
  }

  private async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('jwt.access_key'),
      });

      return payload;
    } catch (error: unknown) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token already expired');
      }

      if (error instanceof JsonWebTokenError) {
        throw new ConflictException('Token is invalid');
      }

      throw new InternalServerErrorException();
    }
  }
}
