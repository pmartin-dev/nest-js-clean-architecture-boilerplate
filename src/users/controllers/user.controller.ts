import { Body, Controller, Post } from '@nestjs/common';

import { ZodValidationPipe } from '../../core/pipes/zod-validation.pipe';
import {
  type CreateUserCommand,
  createUserSchema,
} from '../commands/create-user.command';
import { type SigninCommand, signinSchema } from '../commands/signin.command';
import { CreateUser } from '../use-cases/create-user';
import { SignIn } from '../use-cases/signin';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly signIn: SignIn,
  ) {}

  @Post('signin')
  async handleSignIn(
    @Body(new ZodValidationPipe(signinSchema)) body: SigninCommand,
  ) {
    return this.signIn.execute(body);
  }

  @Post()
  async handleCreateUser(
    @Body(new ZodValidationPipe(createUserSchema)) body: CreateUserCommand,
  ) {
    return this.createUser.execute(body);
  }
}
