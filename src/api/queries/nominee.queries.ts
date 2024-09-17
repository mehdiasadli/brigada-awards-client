import { useInfinite } from '../../hooks/useInfinite';
import { InputQueryWithoutPage } from '../../types/query';
import { nomineeService } from '../services/nominee.service';
import { nomineeKeys } from './keys';

export const useNominees = (
  categoryId: string | null,
  contestId: string | null,
  query: InputQueryWithoutPage = {}
) => {
  return useInfinite(nomineeKeys.listWithQuery({ ...query, categoryId, contestId }), {
    queryFn: ({ pageParam }) =>
      nomineeService.getNominees({ query: { ...query, page: pageParam, categoryId, contestId } }),
  });
};
