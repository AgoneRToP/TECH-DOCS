import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators';
import { UserRoles } from '@/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<UserRoles[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const role = request?.user?.role || UserRoles.viewer

    if(!roles?.includes(role)) throw new ForbiddenException("user don't have access")

    return true;
  }
}
