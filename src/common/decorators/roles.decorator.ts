import { UserRoles } from '@/core';
import { Reflector } from '@nestjs/core';

export const ROLES_KEY = 'ROLES';

export enum RolesEnum {
  user = 'USER',
  admin = 'ADMIN',
}

export const Roles = Reflector.createDecorator<UserRoles[]>({
  key: ROLES_KEY,
});
