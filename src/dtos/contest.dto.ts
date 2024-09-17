import { z } from 'zod';
import { imageDto, nameDto } from './common.dto';
import { createContestConfigDto } from './contest-config.dto';
import { ContestStatus } from '../types/models';

const createContestDtoBase = z.object({
  name: nameDto('Contest name'),
  year: z.number({
    required_error: 'Year of contest is required',
    invalid_type_error: 'Year of contest must be a positive integer number',
  }),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  description: z.string().optional(),
  isMainContest: z.boolean().optional(),
  image: imageDto('Invalid contest image').nullable().optional(),
  config: createContestConfigDto.optional(),
});

export const createContestDto = createContestDtoBase.superRefine((arg, c) => {
  if (arg.endDate && arg.startDate && arg.endDate < arg.startDate) {
    c.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'End date cannot be before than start date',
      path: ['endDate'],
    });
  }
});

export const updateContestDto = createContestDtoBase
  .partial()
  .merge(
    z.object({
      status: z.nativeEnum(ContestStatus).optional(),
    })
  )
  .superRefine((arg, c) => {
    if (arg.endDate && arg.startDate && arg.endDate < arg.startDate) {
      c.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End date cannot be before than start date',
        path: ['endDate'],
      });

      return z.NEVER;
    }

    if (
      arg.config?.pointing !== undefined &&
      arg.config.maxNominationsPerCategory !== undefined &&
      arg.config?.pointing?.length + 1 >= arg.config?.maxNominationsPerCategory
    ) {
      c.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Pointing values cannot be larger than maximum nominations - 1',
        path: ['config.pointing'],
      });

      return z.NEVER;
    }
  });

export const getContestsFiltersDto = z.object({
  ststatus: z.nativeEnum(ContestStatus).optional(),
  onlyMain: z.boolean().optional(),
});

export type CreateContestDto = z.infer<typeof createContestDto>;
export type UpdateContestDto = z.infer<typeof updateContestDto>;
export type GetContestsFiltersDto = z.infer<typeof getContestsFiltersDto>;
