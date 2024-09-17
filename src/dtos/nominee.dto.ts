import { z } from 'zod';
import { idDto } from './common.dto';

export const addNomineeDto = z.object({
  participantIds: z.array(idDto('Participant id')).min(1, 'Minimum 1 participant is required'),
  categoryId: idDto('Category id'),
});

export const getNomineesDto = z.object({
  categoryId: idDto('Category id').nullish(),
  contestId: idDto('Contest id').nullish(),
});

export type AddNomineeDto = z.infer<typeof addNomineeDto>;
export type GetNomineesDto = z.infer<typeof getNomineesDto>;
