import type { User } from '../../users/entities/user.entity';
import {
  I_USER_REPOSITORY,
  type IUserRepository,
} from '../../users/ports/user-repository.interface';
import type { TestApp } from '../utils/test-app';
import type { IFixture } from './fixture';

export class UserFixture implements IFixture {
  constructor(public readonly entity: User) {}

  async load(app: TestApp): Promise<void> {
    const userRepository = app.get<IUserRepository>(I_USER_REPOSITORY);
    userRepository.create(this.entity);
  }
}
