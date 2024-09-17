import { z } from 'zod';
import { nameDto } from './common.dto';

export const createAwardDto = z.object({
  name: nameDto('Mükafat adı'),
  description: z.string().max(300, 'Təsvir maksium 300 simvoldan ibarət olmalıdır').nullish(),
  isNegative: z.boolean().optional(),
});

export const updateAwardDto = createAwardDto.partial();

export type CreateAwardDto = z.infer<typeof createAwardDto>;
export type UpdateAwardDto = z.infer<typeof updateAwardDto>;
