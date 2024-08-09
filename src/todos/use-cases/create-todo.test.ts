import { FixedIdGenerator } from '../../core/adapters/fixed-id-generator';
import { InMemoryTodoRepository } from '../adapters/in-memory-todo.repository';
import { TodoTitleTooLongException } from '../exceptions/todo-title-too-long';
import { CreateTodo } from './create-todo';

describe('Feature: create todo', () => {
  let useCase: CreateTodo;
  let repository: InMemoryTodoRepository;
  let idGenerator: FixedIdGenerator;

  beforeEach(() => {
    repository = new InMemoryTodoRepository();
    idGenerator = new FixedIdGenerator();
    useCase = new CreateTodo(repository, idGenerator);
  });

  describe('Scenario: happy path', () => {
    const title = 'title-1';
    it('should return the ID of the created todo', async () => {
      const result = await useCase.execute({ title });
      expect(result).toStrictEqual({ id: 'id-1', title });
    });

    it('should create the todo in the repository', () => {
      useCase.execute({ title });

      expect(repository.database.length).toBe(1);
    });
  });

  describe('Scenario: the title is too long', () => {
    const title = 'title-1'.repeat(101);
    it('should throw an error if the title is too long', async () => {
      await expect(useCase.execute({ title })).rejects.toThrow(
        TodoTitleTooLongException,
      );
    });
  });
});
