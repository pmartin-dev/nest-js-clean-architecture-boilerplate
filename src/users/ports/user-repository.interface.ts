import { User } from '../entities/user.entity';

export const I_USER_REPOSITORY = 'I_USER_REPOSITORY';

export interface IUserRepository {
  findByEmail(email: string): User | null;
  findById(id: string): User | null;
  create(user: User): void;
}
