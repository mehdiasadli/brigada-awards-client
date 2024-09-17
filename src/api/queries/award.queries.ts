import { useInfinite } from '../../hooks/useInfinite';
import { InputQueryWithoutPage } from '../../types/query';
import { awardService } from '../services/award.service';
import { awardKeys } from './keys';

export const useAwards = (query: InputQueryWithoutPage = {}) => {
  return useInfinite(awardKeys.listWithQuery(query), {
    queryFn: ({ pageParam }) => awardService.getAwards({ query: { ...query, page: pageParam } }),
  });
};
