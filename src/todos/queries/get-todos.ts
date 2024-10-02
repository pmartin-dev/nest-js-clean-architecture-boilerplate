import type { IGetTodosQuery } from '../ports/get-todos-query.interface';
import { ITodoRepository } from '../ports/todo-repository.interface';
import { TodoView } from '../views/todo.view';

export class GetTodosQuery implements IGetTodosQuery {
  constructor(private readonly repository: ITodoRepository) {}

  async execute({ userId }: { userId: string }): Promise<TodoView[]> {
    const todos = await this.repository.findAll({ userId });

    return todos.map((todo) => ({
      id: todo.props.id,
      title: todo.props.title,
    }));
  }
}
