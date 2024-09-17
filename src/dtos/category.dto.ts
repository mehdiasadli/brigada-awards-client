import { z } from 'zod';
import { idDto } from './common.dto';

export const addCategoryDto = z.object({
  awardIds: z.array(idDto('Award id')).min(1, 'Minimum 1 award id is required'),
  contestId: idDto('Contest id'),
});

export const getCategoriesDto = z.object({
  contestId: idDto('Contest id').nullish(),
});

export type AddCategoryDto = z.infer<typeof addCategoryDto>;
export type GetCategoriesDto = z.infer<typeof getCategoriesDto>;
