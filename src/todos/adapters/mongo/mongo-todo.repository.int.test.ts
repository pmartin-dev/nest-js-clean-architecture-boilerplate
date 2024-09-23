import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';

import { AppModule } from '../../../app.module';
import { Todo } from '../../../todos/entities/todo.entity';
import { MongoTodo } from './mongo-todo';
import { MongoTodoRepository } from './mongo-todo.repository';

describe('MongoWebiaireRepository', () => {
  let app: INestApplication;
  let model: Model<MongoTodo.SchemaClass>;
  let repository: MongoTodoRepository;

  const fakeTodo = new Todo({
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
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    model = app.get<Model<MongoTodo.SchemaClass>>(
      getModelToken(MongoTodo.CollectionName),
    );

    repository = new MongoTodoRepository(model);

    await app
      .get<
        Model<MongoTodo.SchemaClass>
      >(getModelToken(MongoTodo.CollectionName))
      .deleteMany({});

    await createTodoInDatabase(fakeTodo);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('find webinaire by id', () => {
    it('should find the corresponding todo', async () => {
      const todo = await repository.findById(fakeTodo.props.id);
      expect(todo).toEqual(fakeTodo);
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
      const newTodo = new Todo({ id: fakeTodo.props.id, title: 'title-2' });
      await repository.update(newTodo);
      const todoInDatabase = await repository.findById(fakeTodo.props.id);
      expect(todoInDatabase).toEqual(newTodo);
    });
  });

  describe('delete todo', () => {
    it('should delete the todo', async () => {
      await repository.delete(fakeTodo);
      const todoInDatabase = await repository.findById(fakeTodo.props.id);
      expect(todoInDatabase).toBeNull();
    });
  });
});
