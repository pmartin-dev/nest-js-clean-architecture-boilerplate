import { Todo } from '../entities/todo.entity';
import { ITodoRepository } from '../ports/todo-repository.interface';

export class InMemoryTodoRepository implements ITodoRepository {
  constructor(public readonly database: Todo[] = []) {}

  findById(id: string): Todo | null {
    return this.database.find((todo) => todo.props.id === id);
  }

  create(todo: Todo): void {
    this.database.push(todo);
  }

  update(todo: Todo): void {
    const index = this.database.findIndex((t) => t.props.id === todo.props.id);
    this.database[index] = todo;
  }

  delete(todo: Todo): void {
    const index = this.database.findIndex((t) => t.props.id === todo.props.id);
    this.database.splice(index, 1);
  }
}
