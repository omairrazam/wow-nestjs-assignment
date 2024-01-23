import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../shared/enums/user-roles.enum'; // Adjust the path as needed

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
