import { useMutate } from '../../hooks/useMutate';
import { awardKeys } from '../queries/keys';
import { awardService } from '../services/award.service';

export const useCreateAward = () => {
  return useMutate(awardService.createAward, {
    autoRefetch: [awardKeys.list()],
  });
};

export const useUpdateAward = () => {
  return useMutate(awardService.updateAward, {
    autoRefetch: [awardKeys.list()],
  });
};

export const useDeleteAward = () => {
  return useMutate(awardService.deleteAward, {
    autoRefetch: [awardKeys.list()],
  });
};
