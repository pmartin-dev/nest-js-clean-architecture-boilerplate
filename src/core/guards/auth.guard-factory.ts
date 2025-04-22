import { APP_GUARD } from '@nestjs/core';

import { Authenticator } from '@/users/services/authenticator';

import { AuthGuard } from './auth.guard';

const EXCLUDED_ROUTES = [
  { path: '/users', method: 'POST' },
  { path: '/users/signin', method: 'POST' },
];

export const AuthGuardProvider = {
  provide: APP_GUARD,
  inject: [Authenticator],
  useFactory: (authenticator: Authenticator) => {
    return new AuthGuard(authenticator, EXCLUDED_ROUTES);
  },
};
