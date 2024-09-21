import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import type { Model } from 'mongoose';
import * as request from 'supertest';

import { AppModule } from '../app.module';
import { MongoTodo } from '../todos/adapters/mongo/mongo-todo';
import { MongoTodoRepository } from '../todos/adapters/mongo/mongo-todo.repository';
import { Todo } from '../todos/entities/todo.entity';

describe('Feature: get a todo', () => {
  let app: INestApplication;

  const todo1 = new Todo({
    id: 'id-1',
    title: 'title-1',
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // const webinaireRepository = app.get<IWebinaireRepository>(
    //   I_WEBINAIRE_REPOSITORY,
    // );

    // await webinaireRepository.create(this.entity);
  });

  afterEach(async () => {
    await app.close();
  }, 3000);

  describe('Scenario: happy path', () => {
    let model: Model<MongoTodo.SchemaClass>;
    let repository: MongoTodoRepository;

    beforeEach(async () => {
      model = app.get<Model<MongoTodo.SchemaClass>>(
        getModelToken(MongoTodo.CollectionName),
      );

      repository = new MongoTodoRepository(model);

      await repository.create(todo1);
    });
    it('should get a todo', async () => {
      const response = await request(app.getHttpServer()).get(
        `/todos/${todo1.props.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual(todo1.props);
    });
  });
});
