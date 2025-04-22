import { CanActivate, type ExecutionContext } from '@nestjs/common';

import { IAuthenticator } from '../../users/services/authenticator';
import { extractToken } from '../utils/extract-token';
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authenticator: IAuthenticator,
    private readonly excludedRoutes: { path: string; method: string }[] = [],
  ) {}

  async canActivate(context: ExecutionContext) {
    if (this.excludedRoutes.length > 0) {
      const request = context.switchToHttp().getRequest();
      const path = request.path;
      const method = request.method;

      if (
        this.excludedRoutes.some(
          (excludedPath) =>
            excludedPath.path === path &&
            excludedPath.method.toUpperCase() === method,
        )
      ) {
        return true;
      }
    }

    const request = context.switchToHttp().getRequest();
    const header = request.headers.authorization;

    if (!header) {
      return false;
    }

    const token = extractToken(header);
    if (!token) {
      return false;
    }

    try {
      const user = await this.authenticator.authenticate(token);
      request.user = user;
      return true;
    } catch (e) {
      return false;
    }
  }
}
