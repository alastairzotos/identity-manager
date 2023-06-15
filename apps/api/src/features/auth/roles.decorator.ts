import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: ('all' | 'dashboard-user')[]) =>
  SetMetadata('roles', roles);
