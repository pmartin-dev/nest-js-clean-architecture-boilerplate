import type { Todo } from '../../todos/entities/todo.entity';
import type { ITodoRepository } from '../../todos/ports/todo-repository.interface';
import type { TestApp } from '../utils/test-app';
import type { IFixture } from './fixture';

export class TodoFixture implements IFixture {
  constructor(public entity: Todo) {}

  async load(app: TestApp) {
    const todoRepository = app.get<ITodoRepository>('I_TODO_REPOSITORY');
    await todoRepository.create(this.entity);
  }
}
