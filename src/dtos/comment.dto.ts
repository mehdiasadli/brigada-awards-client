import { z } from 'zod';

export const createCommentDto = z.object({
  content: z
    .string({
      required_error: 'Content is required',
    })
    .max(250, 'Maximum 250 characters are allowed for a comment'),
});

export const updateCommentDto = createCommentDto.pick({
  content: true,
});

export type CreateCommentDto = z.infer<typeof createCommentDto>;
export type UpdateCommentDto = z.infer<typeof updateCommentDto>;
