import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TestApp } from '../../../tests/utils/test-app';
import { Todo } from '../../../todos/entities/todo.entity';
import { MongoTodo } from './mongo-todo';
import { MongoTodoRepository } from './mongo-todo.repository';

describe('MongoWebiaireRepository', () => {
  let app: TestApp;
  let model: Model<MongoTodo.SchemaClass>;
  let repository: MongoTodoRepository;

  const fakeTodo1 = new Todo({
    id: 'id-1',
    title: 'title-1',
    userId: 'user-1',
  });

  const fakeTodo2 = new Todo({
    id: 'id-2',
    title: 'title-2',
    userId: 'user-2',
  });

  async function createTodoInDatabase(todo: Todo) {
    const record = new model({
      _id: todo.props.id,
      title: todo.props.title,
      userId: todo.props.userId,
    });
    await record.save();
  }

  beforeEach(async () => {
    app = new TestApp();
    await app.setup();

    model = app.get<Model<MongoTodo.SchemaClass>>(
      getModelToken(MongoTodo.CollectionName),
    );

    repository = new MongoTodoRepository(model);

    await createTodoInDatabase(fakeTodo1);
  });

  afterEach(async () => {
    await app.cleanup();
  });

  describe('find all todos', () => {
    it('should find all todos', async () => {
      const todos = await repository.findAll();
      expect(todos).toEqual([fakeTodo1]);
    });
  });

  describe('find todo by id', () => {
    it('should find the corresponding todo', async () => {
      const todo = await repository.findById({
        todoId: fakeTodo1.props.id,
        userId: fakeTodo1.props.userId,
      });
      expect(todo).toEqual(fakeTodo1);
    });

    it('should return null if the todo id does not exist', async () => {
      const todo = await repository.findById({
        todoId: 'does-not-exist',
        userId: fakeTodo1.props.userId,
      });
      expect(todo).toBeNull();
    });

    it('should return null if the user does not exist', async () => {
      const todo = await repository.findById({
        todoId: fakeTodo1.props.id,
        userId: 'does-not-exist',
      });
      expect(todo).toBeNull();
    });
  });

  describe('create todo', () => {
    it('should create the todo', async () => {
      await repository.create(fakeTodo2);
      const todoInDatabase = await repository.findById({
        todoId: fakeTodo2.props.id,
        userId: fakeTodo2.props.userId,
      });
      expect(todoInDatabase).toEqual(fakeTodo2);
    });
  });

  describe('update todo', () => {
    it('should update the todo', async () => {
      const newTodo = new Todo({
        id: fakeTodo1.props.id,
        title: 'title-2',
        userId: fakeTodo1.props.userId,
      });
      await repository.update(newTodo);
      const todoInDatabase = await repository.findById({
        todoId: fakeTodo1.props.id,
        userId: fakeTodo1.props.userId,
      });
      expect(todoInDatabase).toEqual(newTodo);
    });
  });

  describe('delete todo', () => {
    it('should delete the todo', async () => {
      await repository.delete({
        todoId: fakeTodo1.props.id,
        userId: fakeTodo1.props.userId,
      });
      const todoInDatabase = await repository.findById({
        todoId: fakeTodo1.props.id,
        userId: fakeTodo1.props.userId,
      });
      expect(todoInDatabase).toBeNull();
    });
  });
});
