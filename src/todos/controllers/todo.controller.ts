import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '../../core/pipes/zod-validation.pipe';
import { I_GET_TODO_BY_ID_QUERY } from '../ports/get-todo-by-id-query.interface';
import { GetTodoByIdQuery } from '../queries/get-todo-by-id';
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
  ) {}

  @Post('')
  async handleCreateTodo(
    @Body(new ZodValidationPipe(createTodoSchema)) body: CreateTodoCommand,
  ): Promise<TodoView> {
    return this.createTodo.execute({
      title: body.title,
    });
  }

  @Get(':id')
  async handleGetTodo(@Param('id') id: string): Promise<TodoView> {
    return this.getTodoById.execute({ id });
  }
}
