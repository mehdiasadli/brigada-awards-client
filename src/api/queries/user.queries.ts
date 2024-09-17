import { InputQueryWithoutPage } from '../../types/query';
import { userService } from '../services/user.service';
import { userKeys } from './keys';
import { useInfinite } from '../../hooks/useInfinite';
import { useFetch } from '../../hooks/useFetch';

export const useUsers = (query: InputQueryWithoutPage = {}) => {
  return useInfinite(userKeys.listWithQuery(query), {
    queryFn: ({ pageParam }) => userService.getUsers({ query: { ...query, page: pageParam } }),
  });
};

export const useProfile = (username: string) => {
  return useFetch(userKeys.profileWithUsername(username), {
    enabled: !!username,
    queryFn: () => userService.getUser({ username }),
  });
};
