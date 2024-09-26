import { z } from 'zod';

export const validateConfiguration = (
  config: Record<string, any>,
): Record<string, any> => {
  const envSchema = z.object({
    DATABASE_URL: z.string(),
    DATABASE_INT_TEST_URL: z.string(),
    PORT: z.string().regex(/^\d+$/).transform(Number),
    LOG_LEVEL: z.string(),
  });

  const parsedEnv = envSchema.safeParse(config);

  if (!parsedEnv.success) {
    console.error('Invalid environment variables');
    console.table(parsedEnv.error.format());
    throw new Error('Invalid environment variables');
  }

  return parsedEnv.data;
};
