import { TodoView } from '../views/todo.view';

export const I_GET_TODO_BY_ID_QUERY = 'I_GET_TODO_BY_ID_QUERY';

export interface IGetTodoByIdQuery {
  execute(data: { id: string }): Promise<TodoView>;
}
