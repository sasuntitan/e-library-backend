import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/modules/users/models/user-role.enum';

export const HasRoles = (...roles: UserRole[]) => SetMetadata('roles', roles);
