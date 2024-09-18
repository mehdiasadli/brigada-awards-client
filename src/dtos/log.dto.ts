import { z } from 'zod';

export const getLogsDto = z.object({
  method: z.string().nullish(),
  path: z.string().nullish(),
  username: z.string().nullish(),
});

export type GetLogsDto = z.infer<typeof getLogsDto>;
