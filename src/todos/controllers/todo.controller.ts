import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '../../core/pipes/zod-validation.pipe';
import type { User } from '../../users/entities/user.entity';
import { I_GET_TODO_BY_ID_QUERY } from '../ports/get-todo-by-id-query.interface';
import { I_GET_TODOS_QUERY } from '../ports/get-todos-query.interface';
import { GetTodoByIdQuery } from '../queries/get-todo-by-id';
import type { GetTodosQuery } from '../queries/get-todos';
import { CreateTodo } from '../use-cases/create-todo';
import { TodoView } from '../views/todo.view';

const createTodoSchema = z.object({
  title: z.string(),
});
export type CreateTodoCommand = z.infer<typeof createTodoSchema>;

@Controller('todos')
export class TodoController {
  constructor(
    private readonly createTodo: CreateTodo,
    @Inject(I_GET_TODO_BY_ID_QUERY)
    private readonly getTodoById: GetTodoByIdQuery,
    @Inject(I_GET_TODOS_QUERY)
    private readonly getTodos: GetTodosQuery,
  ) {}

  @Get('')
  async handleGetTodos(@Request() req: { user: User }): Promise<TodoView[]> {
    const userId = req.user.props.id;
    return this.getTodos.execute({ userId });
  }

  @Post('')
  async handleCreateTodo(
    @Request() req: { user: User },
    @Body(new ZodValidationPipe(createTodoSchema)) body: CreateTodoCommand,
  ): Promise<TodoView> {
    return this.createTodo.execute({
      title: body.title,
      userId: req.user.props.id,
    });
  }

  @Get(':id')
  async handleGetTodo(
    @Param('id') todoId: string,
    @Request() req: { user: User },
  ): Promise<TodoView> {
    return this.getTodoById.execute({ todoId, userId: req.user.props.id });
  }
}
