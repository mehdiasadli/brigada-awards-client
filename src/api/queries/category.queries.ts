import { useFetch } from '../../hooks/useFetch';
import { useInfinite } from '../../hooks/useInfinite';
import { InputQueryWithoutPage } from '../../types/query';
import { categoryService } from '../services/category.service';
import { categoryKeys } from './keys';

export const useCategories = (contestId: string, query: InputQueryWithoutPage = {}) => {
  return useInfinite(categoryKeys.listWithQueryAndContestId(contestId, query), {
    queryFn: ({ pageParam }) =>
      categoryService.getCategories({
        query: { ...query, page: pageParam, contestId },
      }),
  });
};

export const useCategory = (categoryId: string) => {
  return useFetch(categoryKeys.singleWithId(categoryId), {
    enabled: !!categoryId,
    queryFn: () => categoryService.getCategory({ id: categoryId }),
  });
};
