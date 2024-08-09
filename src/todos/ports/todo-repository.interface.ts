import { Todo } from '../entities/todo.entity';

export const I_TODO_REPOSITORY = 'I_TODO_REPOSITORY';

export interface ITodoRepository {
  findById(id: string): Todo | null;
  create(todo: Todo): void;
  update(todo: Todo): void;
  delete(todo: Todo): void;
}
