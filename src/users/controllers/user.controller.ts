import { Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '../../core/pipes/zod-validation.pipe';
import { CreateUser } from '../use-cases/create-user';

const createUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export type CreateUserCommand = z.infer<typeof createUserSchema>;

@Controller('users')
export class UserController {
  constructor(private readonly createUser: CreateUser) {}

  @Post('')
  async handleCreateUser(
    @Body(new ZodValidationPipe(createUserSchema)) body: CreateUserCommand,
  ) {
    return this.createUser.execute(body);
  }
}
