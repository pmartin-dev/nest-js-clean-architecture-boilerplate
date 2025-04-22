import type { SigninCommand } from '../commands/signin.command';
import { EmailPasswordMismatchException } from '../exceptions/email-password-mismatch';
import type { IUserRepository } from '../ports/user-repository.interface';

export class SignIn {
  constructor(private readonly repository: IUserRepository) {}

  async execute(data: SigninCommand) {
    const email = data.email;
    const password = data.password;

    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new EmailPasswordMismatchException();
    }

    if (user.props.password !== password) {
      throw new EmailPasswordMismatchException();
    }

    return `Basic ${user.props.email}:${user.props.password}`;
  }
}
