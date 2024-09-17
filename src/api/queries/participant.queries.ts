import { useFetch } from '../../hooks/useFetch';
import { useInfinite } from '../../hooks/useInfinite';
import { InputQueryWithoutPage } from '../../types/query';
import { participantService } from '../services/participant.service';
import { participantKeys } from './keys';

export const useParticipants = (contestId: string, query: InputQueryWithoutPage = {}) => {
  return useInfinite(participantKeys.listWithQueryAndContestId(contestId, query), {
    queryFn: ({ pageParam }) =>
      participantService.getParticipants({
        query: { ...query, page: pageParam, contestId },
      }),
  });
};

export const useParticipation = (contestId?: string) => {
  return useFetch(participantKeys.singleWithId(contestId), {
    enabled: !!contestId,
    queryFn: () => participantService.getParticipation({ contestId: contestId! }),
  });
};
