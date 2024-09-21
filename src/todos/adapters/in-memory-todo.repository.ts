import { Todo } from '../entities/todo.entity';
import { ITodoRepository } from '../ports/todo-repository.interface';

export class InMemoryTodoRepository implements ITodoRepository {
  constructor(public readonly database: Todo[] = []) {}

  async findById(id: string): Promise<Todo | null> {
    return this.database.find((todo) => todo.props.id === id);
  }

  async findAll(): Promise<Todo[]> {
    return this.database;
  }

  async create(todo: Todo): Promise<void> {
    this.database.push(todo);
  }

  async update(todo: Todo): Promise<void> {
    const index = this.database.findIndex((t) => t.props.id === todo.props.id);
    this.database[index] = todo;
  }

  async delete(todo: Todo): Promise<void> {
    const index = this.database.findIndex((t) => t.props.id === todo.props.id);
    this.database.splice(index, 1);
  }
}
