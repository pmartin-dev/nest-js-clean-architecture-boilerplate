import { TodoView } from '../views/todo.view';

export const I_GET_TODO_BY_ID_QUERY = 'I_GET_TODO_BY_ID_QUERY';

export interface IGetTodoByIdQuery {
  execute({
    todoId,
    userId,
  }: {
    todoId: string;
    userId: string;
  }): Promise<TodoView>;
}
