import type { IIDGenerator } from '../../core/ports/id-generator.interface';
import type { CreateUserCommand } from '../controllers/user.controller';
import { User } from '../entities/user.entity';
import type { IUserRepository } from '../ports/user-repository.interface';
import type { UserView } from '../views/user.view';

export class CreateUser {
  constructor(
    private readonly repository: IUserRepository,
    private readonly idGenerator: IIDGenerator,
  ) {}

  async execute(data: CreateUserCommand): Promise<UserView> {
    const id = this.idGenerator.generate();
    const email = data.email;
    const password = data.password;

    const user = new User({ id, email, password });

    this.repository.create(user);

    return { id };
  }
}
