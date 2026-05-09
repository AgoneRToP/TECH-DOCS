import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY, RolesEnum } from '../decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<RolesEnum[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    const user = {
      id: 1,
      name: 'Alex',
      role: RolesEnum.user,
    };

    const isExists = roles?.includes(user.role);

    return isExists;
  }
}
