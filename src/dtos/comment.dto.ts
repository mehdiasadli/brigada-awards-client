import { z } from 'zod';
import { idDto } from './common.dto';

export const createCommentDto = z.object({
  content: z
    .string({
      required_error: 'Content is required',
    })
    .max(250, 'Maximum 250 characters are allowed for a comment'),
  categoryId: idDto('Category id'),
  participantId: idDto('Participant id'),
});

export const updateCommentDto = createCommentDto.pick({
  content: true,
});

export const getCommentsQueryDto = z.object({
  categoryId: idDto('Category id').nullish(),
  participantId: idDto('Category id').nullish(),
});

export type CreateCommentDto = z.infer<typeof createCommentDto>;
export type UpdateCommentDto = z.infer<typeof updateCommentDto>;
export type GetCommentsQueryDto = z.infer<typeof getCommentsQueryDto>;
