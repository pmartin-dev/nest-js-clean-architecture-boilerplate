import { User } from '../entities/user.entity';
import { IUserRepository } from '../ports/user-repository.interface';

export interface IAuthenticator {
  authenticate(token: string): Promise<User>;
}

export class Authenticator implements IAuthenticator {
  constructor(private readonly userRepository: IUserRepository) {}

  async authenticate(token: string): Promise<User> {
    const [email, password] = token.split(':');

    const user = await this.userRepository.findByEmail(email);

    if (user === null) {
      throw new Error('User not found');
    }

    if (user.props.password !== password) {
      throw new Error('Password invalid');
    }

    return user;
  }
}
