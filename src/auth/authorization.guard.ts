// authorization.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../users/users.service'; // Adjust the path as needed
import { UserRoles } from '../shared/enums/user-roles.enum'; // Adjust the path as needed

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || roles.length === 0) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user; // Assuming you have a user object attached to the request

    // Check if the user has at least one of the required roles
    return user && user.roles.some((role: UserRoles) => roles.includes(role));
  }
}
