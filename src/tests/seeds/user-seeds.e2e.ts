import { User } from '../../users/entities/user.entity';
import { UserFixture } from '../fixture/user-fixture';

export const e2eUserSeeds = {
  alex: new UserFixture(
    new User({ id: 'user-1', email: 'email@email.fr', password: 'password-1' }),
  ),
  bob: new UserFixture(
    new User({ id: 'user-2', email: 'email@email.fr', password: 'password-2' }),
  ),
};
