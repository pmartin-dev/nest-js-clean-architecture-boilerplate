import { Todo } from '../entities/todo.entity';

export const I_TODO_REPOSITORY = 'I_TODO_REPOSITORY';

export interface ITodoRepository {
  findById(id: string): Promise<Todo | null>;
  findAll(): Promise<Todo[]>;
  create(todo: Todo): Promise<void>;
  update(todo: Todo): Promise<void>;
  delete(todo: Todo): Promise<void>;
}
