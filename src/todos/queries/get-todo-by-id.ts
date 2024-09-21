import { TodoNotFoundException } from '../exceptions/todo-not-found';
import { IGetTodoByIdQuery } from '../ports/get-todo-by-id-query.interface';
import { ITodoRepository } from '../ports/todo-repository.interface';
import { TodoView } from '../views/todo.view';

type Request = {
  id: string;
};

export class GetTodoByIdQuery implements IGetTodoByIdQuery {
  constructor(private readonly repository: ITodoRepository) {}

  async execute(data: Request): Promise<TodoView> {
    const todo = await this.repository.findById(data.id);

    if (todo === null) {
      throw new TodoNotFoundException(); // TODO: do not throw 500
    }

    return {
      id: todo.props.id,
      title: todo.props.title,
    };
  }
}
