import { InMemoryUserRepository } from '../adapters/in-memory-user-repository';
import { User } from '../entities/user.entity';
import { EmailPasswordMismatchException } from '../exceptions/email-password-mismatch';
import { SignIn } from './signin';

describe('Feature: sign in', () => {
  let useCase: SignIn;
  let repository: InMemoryUserRepository;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    useCase = new SignIn(repository);
  });

  const email = 'test@test.fr';
  const password = 'azerty';

  const user = new User({
    id: 'id-1',
    email,
    password,
  });

  describe('Scenario: happy path', () => {
    it('should return the basic auth header', async () => {
      await repository.create(user);

      const result = await useCase.execute({
        email,
        password,
      });
      expect(result).toBe(`Basic ${email}:${password}`);
    });
  });

  describe('Scenario: user not found', () => {
    it('should throw an error if the user does not exist', async () => {
      await expect(
        useCase.execute({ email: 'not-exist@test.fr', password: 'not-exist' }),
      ).rejects.toThrow(EmailPasswordMismatchException);
    });

    it('should throw an error if the password do not match', async () => {
      await expect(
        useCase.execute({ email: 'test@test.fr', password: 'bad-password' }),
      ).rejects.toThrow(EmailPasswordMismatchException);
    });
  });
});
