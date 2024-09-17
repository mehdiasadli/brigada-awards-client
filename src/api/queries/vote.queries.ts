import { voteService } from './../services/vote.service';
import { useFetch } from '../../hooks/useFetch';
import { voteKeys } from './keys';
import { useInfinite } from '../../hooks/useInfinite';
import { InputQueryWithoutPage } from '../../types/query';
import { GetVotesQueryDto } from '../../dtos/vote.dto';

export const useVotesOfParticipant = (participantId?: string) => {
  return useFetch(voteKeys.singleWithId(participantId), {
    enabled: !!participantId,
    queryFn: () => voteService.getVotesOfParticipant({ id: participantId! }),
  });
};

export const useVotes = (contestId: string, query: InputQueryWithoutPage & GetVotesQueryDto = {}) => {
  return useInfinite(voteKeys.listWithQueryAndId(contestId, query), {
    queryFn: ({ pageParam }) => voteService.getVotes({ contestId, query: { ...query, page: pageParam } }),
  });
};
