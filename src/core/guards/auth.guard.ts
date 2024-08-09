import { CanActivate } from '@nestjs/common';
import { IAuthenticator } from '../../users/services/authenticator';
export class AuthGuard implements CanActivate {
  constructor(private readonly authenticator: IAuthenticator) {}

  async canActivate() {
    // const request = context.switchToHttp().getRequest();
    // const header = request.headers.authorization;

    // if (!header) {
    //   return false;
    // }

    // const token = extractToken(header);
    // if (!token) {
    //   return false;
    // }

    // try {
    //   const user = await this.authenticator.authenticate(token);
    //   request.user = user;
    //   return true;
    // } catch (e) {
    //   return false;
    // }
    return true;
  }
}
