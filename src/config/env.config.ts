import { z } from 'zod';

const EnvSchema = z.object({
  MODE: z
    .union([z.literal('development'), z.literal('testing'), z.literal('production')])
    .default('development'),
  VITE_API_BASE: z.string().url(),
});

export const env = EnvSchema.parse(import.meta.env);
export type TypeEnv = z.infer<typeof EnvSchema>;
