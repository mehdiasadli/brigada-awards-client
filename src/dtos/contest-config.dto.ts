import { z } from 'zod';

export const createContestConfigDto = z.object({
  maxNominationsPerCategory: z
    .number()
    .min(2, 'Minimum nominations per category must be 2')
    .max(12, 'Maximum nominations per category must be 12')
    .optional(),
  canParticipantVoteHimself: z
    .boolean({ required_error: 'Can participant vote for himself?' })
    .optional(),
  pointing: z
    .array(z.number().min(1, 'Minimum point value is 1'))
    .min(1, 'Minimum 1 point is required')
    .optional(),
});

export type CreateContestConfigDto = z.infer<typeof createContestConfigDto>;
