import { Todo } from '../../todos/entities/todo.entity';
import { TodoFixture } from '../fixture/todo-fixture';

export const e2eTodoSeeds = {
  todo1: new TodoFixture(
    new Todo({ id: 'id-1', title: 'title-1', userId: 'user-1' }),
  ),
  todo2: new TodoFixture(
    new Todo({ id: 'id-2', title: 'title-2', userId: 'user-1' }),
  ),
};
