import { z } from 'zod';

export interface QueryDtoOptions {
  defaultTake?: number;
}

export const queryDto = (options: QueryDtoOptions = {}) =>
  z.object({
    search: z.string({ invalid_type_error: 'Search query must be a string' }).optional(),
    search_fields: z
      .array(z.string())
      .optional()
      .transform((arg) => {
        return arg?.join(',');
      }),
    sort: z.string({ invalid_type_error: 'Sort field must be a string' }).optional(),
    sort_dir: z.union([z.literal('asc'), z.literal('desc')]).default('asc'),
    page: z.number().transform((arg) => {
      return String(arg);
    }),
    take: z
      .number()
      .optional()
      .transform((arg) => {
        return String(arg ?? options.defaultTake ?? 25);
      }),
  });

export type QueryDto = z.infer<ReturnType<typeof queryDto>>;
