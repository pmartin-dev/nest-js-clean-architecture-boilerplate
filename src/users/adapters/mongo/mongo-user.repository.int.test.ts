import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';

import { AppModule } from '../../../app.module';
import { User } from '../../../users/entities/user.entity';
import { MongoUser } from './mongo-user';
import { MongoUserRepository } from './mongo-user.repository';

describe('MongoUserRepository', () => {
  let app: INestApplication;
  let model: Model<MongoUser.SchemaClass>;
  let repository: MongoUserRepository;

  const fakeUser = new User({
    id: 'id-1',
    email: 'email@email.fr',
    password: 'password-1',
  });

  async function createUserInDatabase(user: User) {
    const record = new model({
      _id: user.props.id,
      email: user.props.email,
      password: user.props.password,
    });
    await record.save();
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    model = app.get<Model<MongoUser.SchemaClass>>(
      getModelToken(MongoUser.CollectionName),
    );

    await app
      .get<
        Model<MongoUser.SchemaClass>
      >(getModelToken(MongoUser.CollectionName))
      .deleteMany({});

    repository = new MongoUserRepository(model);

    await createUserInDatabase(fakeUser);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('find user by email', () => {
    it('should find the corresponding user', async () => {
      const user = await repository.findByEmail(fakeUser.props.email);
      expect(user).toEqual(fakeUser);
    });

    it('should return null if the user does not exist', async () => {
      const user = await repository.findByEmail('email-2');
      expect(user).toBeNull();
    });
  });

  describe('find user by id', () => {
    it('should find the corresponding user', async () => {
      const user = await repository.findById(fakeUser.props.id);
      expect(user).toEqual(fakeUser);
    });

    it('should return null if the user does not exist', async () => {
      const user = await repository.findById('id-2');
      expect(user).toBeNull();
    });
  });

  describe('create user', () => {
    it('should create the user', async () => {
      const user = new User({
        id: 'id-2',
        email: 'email2@email.fr',
        password: 'password-2',
      });
      await repository.create(user);
      const userInDatabase = await repository.findById(user.props.id);
      expect(userInDatabase).toEqual(user);
    });
  });
});
