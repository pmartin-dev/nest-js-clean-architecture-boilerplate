import { TodoView } from '../views/todo.view';
import { TodoNotFoundException } from '../exceptions/todo-not-found';
import { ITodoRepository } from '../ports/todo-repository.interface';
import { IGetTodoByIdQuery } from '../ports/get-todo-by-id-query.interface';

type Request = {
  id: string;
};

export class GetTodoByIdQuery implements IGetTodoByIdQuery {
  constructor(private readonly repository: ITodoRepository) {}

  async execute(data: Request): Promise<TodoView> {
    const todo = this.repository.findById(data.id);

    if (todo === null) {
      throw new TodoNotFoundException();
    }

    return {
      id: todo.props.id,
      title: todo.props.title,
    };
  }
}
