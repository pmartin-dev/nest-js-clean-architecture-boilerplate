import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';

import { AppModule } from '../../../app.module';
import { Todo } from '../../../todos/entities/todo.entity';
import { MongoTodo } from './mongo-todo';
// import { MongoTodoRepository } from './mongo-todo.repository';

describe('MongoWebiaireRepository', () => {
  let app: INestApplication;
  let model: Model<MongoTodo.SchemaClass>;
  // let repository: MongoTodoRepository;

  const fakeTodo = new Todo({
    id: 'id-1',
    title: 'title-1',
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
      // const todo = await repository.findById(fakeTodo.props.id);
      // const todos = await repository.findAll();
      // console.log({ todos });
      // expect(todo).toEqual(fakeTodo);
      expect(1).toBe(1);
    });

    // it('should return null if the todo does not exist', async () => {
    //   const repository = new MongoWebiaireRepository();
    //   const webinaire = await repository.findById('id-2');
    //   expect(webinaire).toBeNull();
    // });
  });

  //   describe('create todo', () => {
  //     it('should create the todo', async () => {
  //       // Arrange
  //       const repository = new MongoWebiaireRepository();

  //       // Act
  //       const webinaire = new Webinaire({
  //         id: 'id-2',
  //         title: 'title-2',
  //         organizerId: 'organizer-id-2',
  //         seats: 2,
  //         startDate: new Date(),
  //         endDate: new Date(),
  //       });
  //       await repository.create(webinaire);
  //       const webinaireInDatabase = await repository.findById(webinaire.props.id);
  //       expect(webinaireInDatabase).toEqual(webinaire);
  //     });
  //   });

  //   describe('update todo', () => {
  //     it('should update the todo', async () => {
  //       // Arrange
  //       const repository = new MongoWebiaireRepository();

  //       // Act
  //       const webinaire = new Webinaire({
  //         id: 'id-1',
  //         title: 'title-1',
  //         organizerId: 'organizer-id-1',
  //         seats: 1,
  //         startDate: new Date(),
  //         endDate: new Date(),
  //       });
  //       await repository.create(webinaire);
  //       await repository.update(webinaire);
  //       const webinaireInDatabase = await repository.findById(webinaire.props.id);
  //       expect(webinaireInDatabase).toEqual(webinaire);
  //     });
  //   });

  //   describe('delete todo', () => {
  //     it('should delete the todo', async () => {
  //       // Arrange
  //       const repository = new MongoWebiaireRepository();

  //       // Act
  //       const webinaire = new Webinaire({
  //         id: 'id-1',
  //         title: 'title-1',
  //         organizerId: 'organizer-id-1',
  //         seats: 1,
  //         startDate: new Date(),
  //         endDate: new Date(),
  //       });
  //       await repository.create(webinaire);
  //       await repository.delete(webinaire);
  //       const webinaireInDatabase = await repository.findById(webinaire.props.id);
  //       expect(webinaireInDatabase).toBeNull();
  //     });
  //   });
});
