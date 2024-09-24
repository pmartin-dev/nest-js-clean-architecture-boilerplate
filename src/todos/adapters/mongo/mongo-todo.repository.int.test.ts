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
  });

  const fakeTodo2 = new Todo({
    id: 'id-2',
    title: 'title-2',
  });

  async function createTodoInDatabase(todo: Todo) {
    const record = new model({
      _id: todo.props.id,
      title: todo.props.title,
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

  describe('find webinaire by id', () => {
    it('should find the corresponding todo', async () => {
      const todo = await repository.findById(fakeTodo1.props.id);
      expect(todo).toEqual(fakeTodo1);
    });

    it('should return null if the todo does not exist', async () => {
      const webinaire = await repository.findById('id-2');
      expect(webinaire).toBeNull();
    });
  });

  describe('create todo', () => {
    it('should create the todo', async () => {
      await repository.create(fakeTodo2);
      const todoInDatabase = await repository.findById(fakeTodo2.props.id);
      expect(todoInDatabase).toEqual(fakeTodo2);
    });
  });

  describe('update todo', () => {
    it('should update the todo', async () => {
      const newTodo = new Todo({ id: fakeTodo1.props.id, title: 'title-2' });
      await repository.update(newTodo);
      const todoInDatabase = await repository.findById(fakeTodo1.props.id);
      expect(todoInDatabase).toEqual(newTodo);
    });
  });

  describe('delete todo', () => {
    it('should delete the todo', async () => {
      await repository.delete(fakeTodo1);
      const todoInDatabase = await repository.findById(fakeTodo1.props.id);
      expect(todoInDatabase).toBeNull();
    });
  });
});
