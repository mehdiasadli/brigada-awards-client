import { z } from 'zod';
import { idDto } from './common.dto';

export const createVoteDto = z.object({
  point: z.number({
    required_error: 'Point is required',
  }),
  voterId: idDto('Voter id'),
  nomineeId: idDto('Nominee id'),
});

export const addVotesDto = z.object({
  votes: z.array(createVoteDto),
});

export const createVoteParamsDto = z.object({
  voterId: idDto('Voter id'),
  nomineeId: idDto('Nominee id'),
});

export const getVotesDto = z.object({
  categoryId: idDto('Category id'),
});

export const getVotesQueryDto = z.object({
  voterId: idDto('Voter id').nullish(),
  nomineeId: idDto('Nominee id').nullish(),
  categoryId: idDto('Category id').nullish(),
});

export const deleteVotesDto = z.object({
  voterId: idDto('Voter id'),
  categoryId: idDto('Category id'),
});

export type CreateVoteDto = z.infer<typeof createVoteDto>;
export type AddVotesDto = z.infer<typeof addVotesDto>;
export type CreateVoteParamsDto = z.infer<typeof createVoteParamsDto>;
export type GetVotesDto = z.infer<typeof getVotesDto>;
export type DeleteVotesDto = z.infer<typeof deleteVotesDto>;
export type GetVotesQueryDto = z.infer<typeof getVotesQueryDto>;
