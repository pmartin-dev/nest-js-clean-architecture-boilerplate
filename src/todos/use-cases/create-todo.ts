import { IIDGenerator } from '../../core/ports/id-generator.interface';
import { CreateTodoCommand } from '../controllers/todo.controller';
import { Todo } from '../entities/todo.entity';
import { TodoTitleTooLongException } from '../exceptions/todo-title-too-long';
import { ITodoRepository } from '../ports/todo-repository.interface';
import { TodoView } from '../views/todo.view';

export class CreateTodo {
  constructor(
    private readonly repository: ITodoRepository,
    private readonly idGenerator: IIDGenerator,
  ) {}

  async execute(data: CreateTodoCommand): Promise<TodoView> {
    const id = this.idGenerator.generate();
    const title = data.title;

    const todo = new Todo({ id, title });

    if (todo.hasTooLongTitle()) {
      throw new TodoTitleTooLongException();
    }

    try {
      this.repository.create(todo);
    } catch (e) {
      console.log(e);
    }
    return { id, title };
  }
}
