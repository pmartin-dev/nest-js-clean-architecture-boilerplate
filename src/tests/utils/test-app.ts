import type { INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import type { Model } from 'mongoose';

import { ConfigurationModule } from '../../core/configuration/configuration.module';
import { ConfigurationService } from '../../core/configuration/configuration.service';
import { AuthGuard } from '../../core/guards/auth.guard';
import { MongoTodo } from '../../todos/adapters/mongo/mongo-todo';
import { TodosModule } from '../../todos/todo.module';
import { MongoUser } from '../../users/adapters/mongo/mongo-user';
import { I_USER_REPOSITORY } from '../../users/ports/user-repository.interface';
import { Authenticator } from '../../users/services/authenticator';
import { UsersModule } from '../../users/users.module';
import type { IFixture } from '../fixture/fixture';

export class TestApp {
  private app: INestApplication;

  async setup() {
    const module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigurationModule],
          inject: [ConfigurationService],
          useFactory: (configService: ConfigurationService) => ({
            uri: configService.database().url,
          }),
        }),
        UsersModule,
        TodosModule,
      ],
      controllers: [],
      providers: [
        {
          provide: Authenticator,
          inject: [I_USER_REPOSITORY],
          useFactory: (repository) => {
            return new Authenticator(repository);
          },
        },
        {
          provide: APP_GUARD,
          inject: [Authenticator],
          useFactory: (authenticator) => {
            return new AuthGuard(authenticator);
          },
        },
      ],
    }).compile();

    this.app = module.createNestApplication();
    await this.app.init();

    await this.clearDatabase();
  }

  async cleanup() {
    await this.app.close();
  }

  async loadFixtures(fixtures: IFixture[]) {
    return Promise.all(fixtures.map((fixture) => fixture.load(this)));
  }

  get<T>(name: any) {
    return this.app.get<T>(name);
  }

  getHttpServer() {
    return this.app.getHttpServer();
  }

  private async clearDatabase() {
    await this.app
      .get<
        Model<MongoTodo.SchemaClass>
      >(getModelToken(MongoTodo.CollectionName))
      .deleteMany({});

    await this.app
      .get<
        Model<MongoUser.SchemaClass>
      >(getModelToken(MongoUser.CollectionName))
      .deleteMany({});
  }
}
