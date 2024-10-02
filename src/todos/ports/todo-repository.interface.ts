import { Todo } from '../entities/todo.entity';

export const I_TODO_REPOSITORY = 'I_TODO_REPOSITORY';

export interface ITodoRepository {
  findById({
    todoId,
    userId,
  }: {
    todoId: string;
    userId: string;
  }): Promise<Todo | null>;
  findAll({ userId }: { userId: string }): Promise<Todo[]>;
  create(todo: Todo): Promise<void>;
  update(todo: Todo): Promise<void>;
  delete({ todoId, userId }: { todoId: string; userId: string }): Promise<void>;
}
