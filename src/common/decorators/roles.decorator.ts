import { Reflector } from '@nestjs/core';

export const ROLES_KEY = 'ROLES';

export enum RolesEnum {
  user = 'USER',
  admin = 'ADMIN',
}

export const Roles = Reflector.createDecorator<RolesEnum>({
  key: ROLES_KEY,
});
