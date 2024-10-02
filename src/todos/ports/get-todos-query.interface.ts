import { TodoView } from '../views/todo.view';

export const I_GET_TODOS_QUERY = 'I_GET_TODOS_QUERY';

export interface IGetTodosQuery {
  execute({
    todoId,
    userId,
  }: {
    todoId: string;
    userId: string;
  }): Promise<TodoView[]>;
}
