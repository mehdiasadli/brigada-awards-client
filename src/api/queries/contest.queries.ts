import { GetContestsFiltersDto } from '../../dtos/contest.dto';
import { useFetch } from '../../hooks/useFetch';
import { useInfinite } from '../../hooks/useInfinite';
import { InputQueryWithoutPage } from '../../types/query';
import { contestService } from '../services/contest.service';
import { contestKeys } from './keys';

export const useContests = (query: InputQueryWithoutPage & GetContestsFiltersDto = {}) => {
  return useInfinite(contestKeys.listWithQuery(query), {
    queryFn: ({ pageParam }) =>
      contestService.getContests({ query: { ...query, page: pageParam } }),
  });
};

export const useOngoingContest = () => {
  return useFetch(contestKeys.index, {
    queryFn: () => contestService.getOngoingContest(),
  });
};

export const useContest = (id: string) => {
  return useFetch(contestKeys.singleWithId(id), {
    enabled: !!id,
    queryFn: () => contestService.getContest({ id }),
  });
};
