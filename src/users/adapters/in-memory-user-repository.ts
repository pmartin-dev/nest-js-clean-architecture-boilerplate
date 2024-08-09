import { User } from '../entities/user.entity';
import { IUserRepository } from '../ports/user-repository.interface';

export class InMemoryUserRepository implements IUserRepository {
  constructor(public readonly database: User[] = []) {}

  async create(user: User): Promise<User> {
    this.database.push(user);
    return user;
  }

  findByEmail(email: string): User | null {
    return this.database.find((user) => user.props.email === email);
  }

  findById(id: string): User | null {
    return this.database.find((user) => user.props.id === id);
  }
}
