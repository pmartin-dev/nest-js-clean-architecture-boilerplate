import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

import { RandomIdGenerator } from '../core/adapters/random-id-generator';
import { I_ID_GENERATOR } from '../core/ports/id-generator.interface';
import { UsersModule } from '../users/users.module';
import { MongoTodo } from './adapters/mongo/mongo-todo';
import { MongoTodoRepository } from './adapters/mongo/mongo-todo.repository';
import { TodoController } from './controllers/todo.controller';
import { I_GET_TODO_BY_ID_QUERY } from './ports/get-todo-by-id-query.interface';
import { I_GET_TODOS_QUERY } from './ports/get-todos-query.interface';
import { I_TODO_REPOSITORY } from './ports/todo-repository.interface';
import { GetTodoByIdQuery } from './queries/get-todo-by-id';
import { GetTodosQuery } from './queries/get-todos';
import { CreateTodo } from './use-cases/create-todo';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: MongoTodo.CollectionName,
        schema: MongoTodo.Schema,
      },
    ]),
  ],
  controllers: [TodoController],
  providers: [
    {
      provide: I_TODO_REPOSITORY,
      inject: [getModelToken(MongoTodo.CollectionName)],
      useFactory: (model) => {
        return new MongoTodoRepository(model);
      },
    },
    {
      provide: I_ID_GENERATOR,
      useFactory: () => {
        return new RandomIdGenerator();
      },
    },
    {
      provide: CreateTodo,
      inject: [I_TODO_REPOSITORY, I_ID_GENERATOR],
      useFactory: (repository, idGenerator) => {
        return new CreateTodo(repository, idGenerator);
      },
    },
    {
      provide: GetTodoByIdQuery,
      inject: [I_TODO_REPOSITORY],
      useFactory: (repository) => {
        return new GetTodoByIdQuery(repository);
      },
    },
    {
      provide: I_GET_TODO_BY_ID_QUERY,
      inject: [I_TODO_REPOSITORY],
      useFactory: (repository) => {
        return new GetTodoByIdQuery(repository);
      },
    },
    {
      provide: I_GET_TODOS_QUERY,
      inject: [I_TODO_REPOSITORY],
      useFactory: (repository) => {
        return new GetTodosQuery(repository);
      },
    },
  ],
  exports: [I_ID_GENERATOR],
})
export class TodosModule {}
