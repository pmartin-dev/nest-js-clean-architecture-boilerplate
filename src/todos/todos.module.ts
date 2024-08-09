import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { I_TODO_REPOSITORY } from './ports/todo-repository.interface';
import { InMemoryTodoRepository } from './adapters/in-memory-todo.repository';
import { CreateTodo } from './use-cases/create-todo';
import { I_ID_GENERATOR } from '../core/ports/id-generator.interface';
import { RandomIdGenerator } from '../core/adapters/random-id-generator';
import { GetTodoByIdQuery } from './queries/get-todo-by-id';
import { TodoController } from './controllers/todo.controller';
import { I_GET_TODO_BY_ID_QUERY } from './ports/get-todo-by-id-query.interface';

@Module({
  imports: [UsersModule, TodosModule],
  controllers: [TodoController],
  providers: [
    {
      provide: I_TODO_REPOSITORY,
      useFactory: () => {
        return new InMemoryTodoRepository();
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
  ],
  exports: [],
})
export class TodosModule {}
