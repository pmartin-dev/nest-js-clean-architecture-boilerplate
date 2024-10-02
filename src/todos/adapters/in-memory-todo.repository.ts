import { Todo } from '../entities/todo.entity';
import { ITodoRepository } from '../ports/todo-repository.interface';

export class InMemoryTodoRepository implements ITodoRepository {
  constructor(public readonly database: Todo[] = []) {}

  async findById({ todoId, userId }): Promise<Todo | null> {
    return this.database.find(
      (todo) => todo.props.id === todoId && todo.props.userId === userId,
    );
  }

  async findAll({ userId }): Promise<Todo[]> {
    return this.database.filter((todo) => todo.props.userId === userId);
  }

  async create(todo: Todo): Promise<void> {
    this.database.push(todo);
  }

  async update(todo: Todo): Promise<void> {
    const index = this.database.findIndex(
      (t) =>
        t.props.id === todo.props.id && t.props.userId === todo.props.userId,
    );
    this.database[index] = todo;
  }

  async delete({ todoId, userId }): Promise<void> {
    const index = this.database.findIndex(
      (t) => t.props.id === todoId && t.props.userId === userId,
    );
    this.database.splice(index, 1);
  }
}
