import { User } from '../entities/user.entity';
import { IUserRepository } from '../ports/user-repository.interface';

export class InMemoryUserRepository implements IUserRepository {
  constructor(public readonly database: User[] = []) {}

  async create(user: User): Promise<User> {
    this.database.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.database.find((user) => user.props.email === email);
  }

  async findById(id: string): Promise<User | null> {
    return this.database.find((user) => user.props.id === id);
  }
}
