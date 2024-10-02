import { FixedIdGenerator } from '../../core/adapters/fixed-id-generator';
import { InMemoryUserRepository } from '../adapters/in-memory-user-repository';
import { CreateUser } from './create-user';

describe('Feature: create todo', () => {
  let useCase: CreateUser;
  let repository: InMemoryUserRepository;
  let idGenerator: FixedIdGenerator;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    idGenerator = new FixedIdGenerator();
    useCase = new CreateUser(repository, idGenerator);
  });

  describe('Scenario: happy path', () => {
    const email = 'email@email.fr';
    const password = 'azerty';
    it('should return the ID of the created user', async () => {
      const result = await useCase.execute({
        email,
        password,
      });
      expect(result).toStrictEqual({ id: 'id-1' });
    });

    it('should create the user in the repository', async () => {
      await useCase.execute({
        email,
        password,
      });

      expect(repository.database.length).toBe(1);
    });
  });

  // describe('Scenario: the title is too long', () => {
  //   const title = 'title-1'.repeat(101);
  //   it('should throw an error if the title is too long', async () => {
  //     await expect(useCase.execute({ title })).rejects.toThrow(
  //       TodoTitleTooLongException,
  //     );
  //   });
  // });
});
