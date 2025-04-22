import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export type CreateUserCommand = z.infer<typeof createUserSchema>;
