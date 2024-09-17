import { useFetch } from '../../hooks/useFetch';
import { resultService } from '../services/result.service';
import { resultKeys } from './keys';

export const useCategoryResults = (id: string, completed = true) => {
  return useFetch(resultKeys.byCategory(id + completed), {
    enabled: !!id && completed,
    queryFn: () => resultService.getCategoryRanks({ id }),
  });
};

export const useParticipantResults = (id: string, isOnDashboard?: boolean) => {
  return useFetch(resultKeys.byParticipant(id), {
    enabled: !!id && !!isOnDashboard,
    queryFn: () => resultService.getParticipantRanks({ id }),
  });
};

export const useUserResults = (id: string) => {
  return useFetch(resultKeys.byUser(id), {
    enabled: !!id,
    queryFn: () => resultService.getUserRanks({ id }),
  });
};

export const useContestResults = (id: string) => {
  return useFetch(resultKeys.byContest(id), {
    enabled: !!id,
    queryFn: () => resultService.getContestRanks({ id }),
  });
};

export const useAwardResults = (id: string) => {
  return useFetch(resultKeys.byAward(id), {
    enabled: !!id,
    queryFn: () => resultService.getAwardRanks({ id }),
  });
};
