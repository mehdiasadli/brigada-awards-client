import { useMutate } from '../../hooks/useMutate';
import { contestKeys } from '../queries/keys';
import { contestService } from '../services/contest.service';

export const useCreateContest = () => {
  return useMutate(contestService.createContest, {
    autoRefetch: [contestKeys.list()],
  });
};

export const useUpdateContest = () => {
  return useMutate(contestService.updateContest, {
    autoRefetch: [contestKeys.list()],
  });
};

export const useDeleteContest = () => {
  return useMutate(contestService.deleteContest, {
    autoRefetch: [contestKeys.list()],
  });
};
