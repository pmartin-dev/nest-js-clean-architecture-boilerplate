import { InMemoryUserRepository } from '../adapters/in-memory-user-repository';
import { User } from '../entities/user.entity';
import { Authenticator } from './authenticator';

describe('Authenticator', () => {
  let repository: InMemoryUserRepository;
  let authenticator: Authenticator;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    repository.create(
      new User({ id: 'id-1', email: 'email@email.fr', password: 'azerty' }),
    );
    authenticator = new Authenticator(repository);
  });

  describe('Case: the token is valid', () => {
    it('should return the user', async () => {
      const token = `email@email.fr:azerty`;

      const user = await authenticator.authenticate(token);

      expect(user.props).toEqual({
        id: 'id-1',
        email: 'email@email.fr',
        password: 'azerty',
      });
    });
  });
});
