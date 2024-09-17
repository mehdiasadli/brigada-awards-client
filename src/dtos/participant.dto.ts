import { z } from 'zod';
import { idDto } from './common.dto';

export const addParticipantDto = z.object({
  userIds: z.array(idDto('User id')).min(1, 'Minimum 1 user is required'),
  contestId: idDto('Contest id'),
});

export const getParticipantsDto = z.object({
  contestId: idDto('Contest id').nullish(),
});

export type AddParticipantDto = z.infer<typeof addParticipantDto>;
export type GetParticipantsDto = z.infer<typeof getParticipantsDto>;
